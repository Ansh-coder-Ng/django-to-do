from rest_framework import serializers
from .models import Tasks
from .models import Users


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=Users
        field="__all__"