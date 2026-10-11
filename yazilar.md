---
layout: split
title: "Yazılar"
permalink: /yazilar/
---

<div id="yazilar">
  <ul class="post-list">
    {% assign all_posts = site.posts | sort: "date" | reverse %}
    {% for post in all_posts %}
    {% include post-list-item.html post=post meta="author_column" %}
    {% endfor %}
  </ul>
</div>
