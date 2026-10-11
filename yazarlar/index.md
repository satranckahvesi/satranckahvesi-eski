---
layout: split
title: "Yazarlar"
permalink: /yazarlar/
---

<ul class="index-list">
  {% assign authors = site.posts | map: "author" | uniq %}
  {% for author in authors %}
  <li>
    <h3><a class="link-primary" href="{% include author-url.html name=author %}">{{ author }}</a></h3>
  </li>
  {% endfor %}
</ul>
