---
layout: default
---

<div id="yazilar" class="section split">
  <ul class="post-list">
    {% assign all_posts = site.posts | sort: "date" | reverse %}
    {% for post in all_posts %}
    {% include post-list-item.html post=post meta="author_column" excerpt=true %}
    {% endfor %}
  </ul>
  {% include home-art.html %}
</div>
