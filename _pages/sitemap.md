---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
---

{% include base_path %}

A list of the pages and publications on this site. An [XML version]({{ base_path }}/sitemap.xml) is also available.

<h2>Pages</h2>
{% for post in site.pages %}
{% if post.title and post.sitemap != false %}
{% include archive-single.html %}
{% endif %}
{% endfor %}

{% for collection in site.collections %}
{% if collection.output and collection.label != "posts" %}
<h2>{{ collection.label | capitalize }}</h2>
{% for post in collection.docs %}
{% include archive-single.html %}
{% endfor %}
{% endif %}
{% endfor %}
