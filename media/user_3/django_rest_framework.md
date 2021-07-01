# Setting up a django project to handle django rest framework

## install rest framework
Rest Framework must be installed in virtual environement and added to __*requirements.txt*__.

    pip3 install djangoRestFramework

## adjustments in settings.py

**add:**

    INSTALLED_APPS = [
        ... 
        'api',
        'optional_front_end_app_for_api'
        'rest_framework',
        ...
    ]


    REST_FRAMEWORK = {
        'DEFAULT_METADATA_CLASS': 'rest_framework.metadata.SimpleMetadata'
    }

# Models and serializers

1. db models can be created normally in the **models.py** file

2. create file **serializers.py** to store the serializers for each model

    import serializers from django and the relevant models:

        from rest_framework import serializers
        
        from .models import Dummy
        import accounts.models as accounts

    create one or more serializers for each model.

    **example serializers**

    - a minimal user serializer to be used by the dummy serializer

            class UserSerializer(serializers.ModelSerializer):
            """  simple user class serializer """
            class Meta:
                model = accounts.User
                fields = ['id', 'username']    

    - a partial dummy serializer, that ignores the actual md file and html conversion to optimize the list view.

            class PartialDummySerializer(serializers.ModelSerializer):
            """partial dummy serializer used in list view."""
            class Meta:
                model = Dummy
                fields = ['id', 'public', 'user', 'title', 'subtitle', 'created_at', 'last_edited']

    - The complete dummy serializer. Which returns all the model attributes as well as the result of the methods

        - get_html (which returns the md file content in html format)
        - get_content(which returns the md file content as a string.)

                class DummySerializer(serializers.ModelSerializer):
                """full dummy serializer used in detail view."""
                    content = serializers.SerializerMethodField()
                    html = serializers.SerializerMethodField()
                    
                    class Meta:
                        model = Dummy
                        fields = [
                            'id', 'public', 'user', 'title', 'subtitle', 'created_at', 'last_edited',
                            'content', 'html'
                        ]

                    def get_content(self, instance):
                        return instance.get_content()

                    def get_html(self, instance):
                        return instance.get_html()


3. Django viewsets are a very practical way of creating CRUD views that return a json response. They can be created as classbased views and the url pattern for them needs to be registered

** in _views.py_**:

import viewsets and Response from rest fmw and relevant serializer classes:

    from rest_framework import viewsets
    from rest_framework.response import Response

    from .serializers import DummySerializer, PartialDummySerializer

This class based view edits the default list view to:

1. filter the query set and return only Dummy items where public is set to true.
2. Use the partial dummy serializer to avoid loading too much useless data.

        class DummyViewSet(viewsets.ModelViewSet):
        queryset = Dummy.objects.all()
        serializer_class = DummySerializer

        def list(self, request):
            queryset = Dummy.objects.filter(public=True)
            serializer = PartialDummySerializer(queryset, many=True)
            return Response(serializer.data)

**in _urls.py_**:

    from rest_framework import routers

    from . import views

    urlpatterns = [
        path('', views.index, name='api_index'),
    ]

    router = routers.SimpleRouter(True)

    #register the routes for viewset instance:
    router.register(r'dummy', views.DummyViewSet)

    #adds registered route urls to url patterns
    urlpatterns += router.urls