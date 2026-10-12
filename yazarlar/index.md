---
layout: split
title: "Yazarlar"
permalink: /yazarlar/
---

<ul class="tag-list avatar-list">
  {% assign authors = site.posts | map: "author" | uniq %}
  {% for author in authors %}
  <li>
    {% capture author_url %}{% include author-url.html name=author %}{% endcapture %}
    <a class="avatar-link" href="{{ author_url }}" tabindex="-1" aria-hidden="true">{% include author-avatar.html name=author %}</a>
    <a class="avatar-name" href="{{ author_url }}">{{ author }}</a>
  </li>
  {% endfor %}
</ul>
