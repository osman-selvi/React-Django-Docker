from rest_framework import routers
from posts import views

router = routers.SimpleRouter()
router.register(r'abouts', views.AboutViewSet)
router.register(r'posts', views.PostViewSet)