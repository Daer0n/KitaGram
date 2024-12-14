from rest_framework.routers import DefaultRouter

from innotter import views

router = DefaultRouter()
router.register(r"rooms", views.RoomViewSet)
router.register(r"feed", views.FeedViewSet, basename="feed")
router.register(r"tags", views.TagViewSet)

urlpatterns = router.urls
