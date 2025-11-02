from django.db import models
from django_cryptography.fields import encrypt

class Users(models.Model):
    email=models.EmailField(unique=True)
    username=models.CharField(max_length=30)
    password=models.CharField(max_length=220)


class Tasks(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="tasks")
    task_name=models.CharField(max_length=10)


