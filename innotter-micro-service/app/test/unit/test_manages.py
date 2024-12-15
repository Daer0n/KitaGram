import pytest

from innotter.models import Follower


@pytest.mark.django_db
class TestFollowerManager:
    def test_follow_page(self, page, user_id):
        Follower.objects.follow_page(page, user_id)
        assert Follower.objects.count() == 1
        Follower.objects.follow_page(page, user_id)
        assert Follower.objects.count() == 1

    def test_unfollow_page(self, page, user_id):
        Follower.objects.follow_page(page, user_id)

        Follower.objects.unfollow_page(page, user_id)
        assert Follower.objects.count() == 0
        Follower.objects.unfollow_page(page, user_id)
        assert Follower.objects.count() == 0

