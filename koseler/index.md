---
layout: split
title: "Köşeler"
permalink: /koseler/
---

{% assign columns = site.posts | map: "column" | uniq %}
<ul class="board-list" style="--board-cols: {{ columns.size | at_most: 2 }}; --board-cols-wide: {{ columns.size | at_most: 3 }}">
  {% for col in columns %}
  {% assign count = site.posts | where: "column", col | size %}
  {% assign longest = 1 %}
  {% assign col_words = col | split: " " %}
  {% for word in col_words %}{% if word.size > longest %}{% assign longest = word.size %}{% endif %}{% endfor %}
  <li style="--longest: {{ longest }}">
    <a href="{% include column-url.html name=col %}">
      <span class="board-name">{{ col }}</span>
      <span class="board-count">{{ count }} yazı</span>
    </a>
  </li>
  {% endfor %}
</ul>
