import graphene

from AhechoesCommunity import community


class Query(community.schema.Query, graphene.ObjectType):
    #combine the queries from different apps
    pass

class Mutation(community.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)





