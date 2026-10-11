---
layout: split
title: "Yazarlar"
permalink: /yazarlar/
---

<ul class="index-list">
  {% assign authors = site.posts | map: "author" | uniq %}
  {% for author in authors %}
  <li>
    <a class="index-latest no-underline-hover" href="{% include author-url.html name=author %}">{{ author }}</a>
  </li>
  {% endfor %}
</ul>
