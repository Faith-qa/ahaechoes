from django.db import models

# Create your models here.
#user models

class Thread(models.Model):
    user_id = models.CharField()
    title = models.CharField(max_length=100)
    content = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)

class Comment(models.Model):
    threadid = models.ForeignKey(Thread, related_name="comments", on_delete=models.CASCADE())
    content = models.TextField()
    created_at = models.DateTimeField(auto_now=True)
    userid = models.CharField()

class Reply(models.Model):
    comment = models.ForeignKey(Comment, related_name='replies', on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user_id = models.CharField(max_length=255)

class Like(models.Model):
    user_id = models.CharField(max_length=255)  # The user who liked the post
    thread = models.ForeignKey(Thread, related_name='likes', on_delete=models.CASCADE, null=True, blank=True)
    comment = models.ForeignKey(Comment, related_name='likes', on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user_id', 'thread', 'comment')  # Ensure one like per user per post/comment