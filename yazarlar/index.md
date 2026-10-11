---
layout: split
title: "Yazarlar"
permalink: /yazarlar/
---

<ul class="tag-list avatar-list">
  {% assign authors = site.posts | map: "author" | uniq %}
  {% for author in authors %}
  {% assign words = author | split: " " %}
  {% if site.chess_titles contains words[0] %}
    {% assign name_words = words | slice: 1, 10 %}
  {% else %}
    {% assign name_words = words %}
  {% endif %}
  {% assign first_initial = name_words | first | slice: 0, 1 %}
  {% assign last_initial = name_words | last | slice: 0, 1 %}
  {% assign initials = first_initial | append: last_initial %}
  <li>
    <a href="{% include author-url.html name=author %}">
      <span class="avatar-circle" aria-hidden="true">{{ initials | upcase }}</span>
      <span class="avatar-name">{{ author }}</span>
    </a>
  </li>
  {% endfor %}
</ul>
