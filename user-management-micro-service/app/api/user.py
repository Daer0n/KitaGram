from typing import Annotated, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, UploadFile
from starlette import status

from app.api.dependencies import cloud_service, groups_service, users_service
from app.schemas.users import UserOutSchema, UserUpdateSchema
from app.services.cloud import CloudService
from app.services.groups import GroupsService
from app.services.users import UsersService
from app.utils.oauth_bearer import get_current_unblocked_user
from app.utils.roles import Role

router = APIRouter(
    prefix="/user",
    tags=["User"],
)


@router.get("/me", response_model=UserOutSchema)
async def me_get(
    user: Annotated[UserOutSchema, Depends(get_current_unblocked_user)],
):
    try:
        return user
    except Exception as e:
        raise e


@router.patch("/me", response_model=UserOutSchema)
async def me_patch(
    new_values: UserUpdateSchema,
    user: Annotated[UserOutSchema, Depends(get_current_unblocked_user)],
    users_service: Annotated[UsersService, Depends(users_service)],
    groups_service: Annotated[GroupsService, Depends(groups_service)],
):
    try:
        updated_group = await groups_service.update_group(
            user.group, new_values.group_name
        )
        updated_user = await users_service.update_user(
            user, new_values, updated_group.id
        )
        if updated_group.id != user.group.id:
            await groups_service.delete_group_by_id_if_empty(user.group.id)
        return updated_user
    except UsersService.UserExistsException as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"{e.idtf} [{e.value}] is already used",
        )
    except UsersService.NothingToUpdateException:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"No changes avalible"
        )
    except Exception as e:
        raise e


@router.delete("/me", status_code=204)
async def me_delete(
    user: Annotated[UserOutSchema, Depends(get_current_unblocked_user)],
    users_service: Annotated[UsersService, Depends(users_service)],
    groups_service: Annotated[GroupsService, Depends(groups_service)],
):
    try:
        await users_service.delete_user_by_id(user.id)
        await groups_service.delete_group_by_id_if_empty(user.group.id)
    except Exception as e:
        raise e


@router.patch("/me/photo")
async def me_upload_photo(
    photo: UploadFile,
    user: Annotated[UserOutSchema, Depends(get_current_unblocked_user)],
    users_service: Annotated[UsersService, Depends(users_service)],
    cloud_service: Annotated[CloudService, Depends(cloud_service)],
):
    try:
        path = await cloud_service.upload_image(user.id, photo.file)
        try:
            await users_service.update_user(
                user, UserUpdateSchema(img_path=path), user.group.id
            )
        except UsersService.NothingToUpdateException:
            pass
        return path
    except Exception as e:
        raise e


@router.get("s", response_model=List[UserOutSchema])
async def users_get(
    user: Annotated[UserOutSchema, Depends(get_current_unblocked_user)],
    users_service: Annotated[UsersService, Depends(users_service)],
    page: int = None,
    limit: int = None,
    filter_by_name: str = None,
    filter_by_surname: str = None,
    sotred_by: str = None,
    order_by: str = None,
):
    try:
        if user.role == Role.admin:
            group_id = None
        elif user.role == Role.moderator:
            group_id = user.group.id
        else:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Permission denied",
            )
        users = await users_service.get_users(
            page,
            limit,
            filter_by_name,
            filter_by_surname,
            group_id,
            sotred_by,
            order_by,
        )
        return users
    except Exception as e:
        raise e


@router.get("/{user_id}", response_model=UserOutSchema)
async def users_get(
    user_id: UUID,
    user: Annotated[UserOutSchema, Depends(get_current_unblocked_user)],
    users_service: Annotated[UsersService, Depends(users_service)],
):
    try:
        if user.role == Role.user:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Permission denied",
            )
        aim_user = await users_service.get_user_by_id(user_id)
        if user.role == Role.moderator and user.group.id != aim_user.group.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Permission denied",
            )
        return aim_user
    except UsersService.UserNotFoundException as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"User with id: [{user_id}] not found",
        )
    except Exception as e:
        raise e


@router.patch("/{user_id}", response_model=UserOutSchema)
async def users_get(
    user_id: UUID,
    new_values: UserUpdateSchema,
    user: Annotated[UserOutSchema, Depends(get_current_unblocked_user)],
    users_service: Annotated[UsersService, Depends(users_service)],
    groups_service: Annotated[GroupsService, Depends(groups_service)],
):
    try:
        if user.role != Role.admin:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Permission denied",
            )
        aim_user = await users_service.get_user_by_id(user_id)
        updated_group = await groups_service.update_group(
            aim_user.group, new_values.group_name
        )
        updated_user = await users_service.update_user(
            aim_user, new_values, updated_group.id
        )
        if aim_user.group.id != updated_group.id:
            await groups_service.delete_group_by_id_if_empty(aim_user.group.id)
        return updated_user
    except UsersService.UserExistsException as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"{e.idtf} [{e.value}] is already used",
        )
    except UsersService.NothingToUpdateException:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"No changes avalible"
        )
    except Exception as e:
        raise e
