import graphene
from graphene_django import DjangoObjectType

from threads.models import Thread, Comment, Like, Reply

class ThreadType(DjangoObjectType):
    class Meta:
        model = Thread
        fields = "__all__"

class CommentType(DjangoObjectType):
    class Meta:
        model = Comment
        fields = "__all__"

class LikeType(DjangoObjectType):
    class Meta:
        model = Like
        fields = "__all__"
class ReplyType(DjangoObjectType):
    class Meta:
        model = Reply
        fields = "__all__"

class CreateThread(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        content = graphene.String(required=True)
        userId = graphene.String(required=True)
    thread = graphene.Field(ThreadType)

    def mutate(self, info, id, title=None, content=None, userId = None):
        thread = Thread(title=title, content=content, userId=userId)
        thread.save()
        return CreateThread(thread=thread)

class UpdateThread(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String()
        content = graphene.String()
    thread = graphene.Field(ThreadType)

    def mutate(self, info, id, title=None, content=None):
        try:
            thread = Thread.objects.get(pk=id)
        except Thread.DoesNotExist:
            raise Exception("thread does not exist")
        if title is not None:
            thread.title = title
        if content is not None:
            thread.content = content
        thread.save()
        return UpdateThread(thread=thread)

class DeleteThread(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
    success = graphene.Boolean

    def mutate(self, info, id):
        try:
            thread = Thread.objects.get(pk=id)
        except thread.DoesNotExist:
            raise Exception("Thread does not exist")
        thread.delete()
        return DeleteThread(success=True)

class Query(graphene.ObjectType):
    threads = graphene.List(ThreadType)
    commentsbythread = graphene.List(CommentType, threadid=graphene.ID(required=True))

    def resolve_threads(self, info):
        return Thread.objects.all()

    def resolve_comments_by_thread(self,info,  threadid):
        try:
            return Comment.objects.get(threadid=threadid)
        except Comment.DoesNotExist:
            return None

class Mutation(graphene.ObjectType):
    create_thread = CreateThread.Field()
    update_thread = UpdateThread.Field()
    delete_thread = DeleteThread.Field()
schema = graphene.Schema(query=Query, mutation=Mutation)