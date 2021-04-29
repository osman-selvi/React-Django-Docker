from rest_framework import serializers
from .models import Post, About

class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = ('id', 'title', 'text', 'image', 'instagram_link', 'created_at', 'updated_at')

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'description', 'text', 'image', 'created_at', 'updated_at')