---
layout: split
title: "Köşeler"
permalink: /koseler/
---

<ul class="board-list">
  {% assign columns = site.posts | map: "column" | uniq %}
  {% for col in columns %}
  {% assign count = site.posts | where: "column", col | size %}
  <li>
    <a href="{% include column-url.html name=col %}">
      <span class="board-name">{{ col }}</span>
      <span class="board-count">{{ count }} yazı</span>
    </a>
  </li>
  {% endfor %}
</ul>
