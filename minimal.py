import sys
from time import sleep
from uuid import uuid4

from django.conf import settings
from django.conf.urls import url
from django.core.management import execute_from_command_line
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.conf.urls.static import static
from django.views.generic import TemplateView

import os
import json

PROJECT_PATH = os.path.realpath(os.path.dirname(__file__))


settings.configure(
    DEBUG=True,
    ROOT_URLCONF=sys.modules[__name__],
    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [
                    PROJECT_PATH + '/templates/',
                ],
        }
    ],
    MEDIA_URL = '/media/',
    MEDIA_ROOT = PROJECT_PATH + '/media/',
    STATIC_ROOT = PROJECT_PATH + '/static/',
    STATIC_URL='/static/',
    INSTALLED_APPS = [
        'webpack_loader'
    ],
    WEBPACK_LOADER = {
        'DEFAULT': {
            'BUNDLE_DIR_NAME': 'dist/',
            'STATS_FILE': os.path.join(PROJECT_PATH, 'webpack-stats.json'),
        }
    }
)

# def compareBenchmarks(stock):
#     if stock['return_vs_benchmark']
#         return



def index(request):
    temp = json.loads(recommendations(request).content)['recs']
    recs = temp
    # sorted(temp, temp.key=['benchmark_return'])
    # temp.sort()
    # print(temp)
    for item in temp :
        # print(key , " :: " , temp[key])
        print("NEW ITEM :: ", item['benchmark_return'])
    
    return render(request, 'index.html', {
        'recommendations': recs,
        'topRecommendations': recs
    })

# def home(request):
#     response = requests.get('http://freegeoip.net/json/')
#     geodata = response.json()
#     return render(request, 'core/home.html', {
#         'ip': geodata['ip'],
#         'country': geodata['country_name']
#     })


def ecap_ajax(request):
    if request.POST.get('email'):
        sleep(1)
        return JsonResponse(data={'user_id': str(uuid4()), 'campaign_url': 'https://www.fool.com'}, status=201)
    return HttpResponse(status=400)


def disclosure(request):
    disclosure_api_file = os.path.join(PROJECT_PATH + '/apis/', 'disclosure_api.json')
    with open(disclosure_api_file, "r") as f:
        disclosure_data = json.load(f)
    return JsonResponse(data=disclosure_data)


def recommendations(request):
    disclosure_api_file = os.path.join(PROJECT_PATH + '/apis/', 'recommendations_api.json')
    with open(disclosure_api_file, "r") as f:
        disclosure_data = json.load(f)
    sleep(1.75)
    # return JsonResponse(data=disclosure_data, safe=False)
    return JsonResponse(data=disclosure_data)


urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'add_to_campaign', ecap_ajax),
    url('disclosure', disclosure),
    url('recs', recommendations),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
              + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if __name__ == '__main__':
    execute_from_command_line(sys.argv)
