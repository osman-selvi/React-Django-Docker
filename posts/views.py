from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser
from . import models
from . import serializers

class AboutViewSet(ModelViewSet):
    queryset = models.About.objects.all()
    serializer_class = serializers.AboutSerializer

class PostViewSet(ModelViewSet):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer