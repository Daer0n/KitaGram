from rest_framework.routers import DefaultRouter

from innotter import views

router = DefaultRouter()
router.register(r"rooms", views.RoomViewSet)
router.register(r"feed", views.FeedViewSet, basename="feed")
router.register(r"tag", views.TagViewSet)
router.register(r"tags", views.TagsViewSet, basename="tags")

urlpatterns = router.urls
