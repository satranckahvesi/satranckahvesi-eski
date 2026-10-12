---
layout: split
title: "Yazarlar"
permalink: /yazarlar/
---

<ul class="tag-list avatar-list">
  {% assign authors = site.posts | map: "author" | uniq %}
  {% for author in authors %}
  <li>
    <a href="{% include author-url.html name=author %}">
      {% include author-avatar.html name=author %}
      <span class="avatar-name">{{ author }}</span>
    </a>
  </li>
  {% endfor %}
</ul>
