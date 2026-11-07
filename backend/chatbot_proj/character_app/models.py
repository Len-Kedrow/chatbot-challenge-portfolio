from django.db import models
from django.conf import settings
import os

class Character(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="characters"
    )
    strength = models.IntegerField(default=1)
    charisma = models.IntegerField(default=1)
    intelligence = models.IntegerField(default=1)
    image = models.ImageField(upload_to='characters/', null=True, blank=True)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name} (User: {self.user.username})"
    def delete(self, *args, **kwargs):
            # Check if the character has an image
            if self.image:
                # Get the image file path
                image_path = self.image.path
                # Delete the image file from the filesystem
                if os.path.isfile(image_path):
                    os.remove(image_path)
            # Call the parent class's delete method to delete the instance
            super().delete(*args, **kwargs)