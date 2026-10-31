"""Makes guest/index.html from family/index.html.

The two pages are the same except that the guest page has no Haldi and Sangeet cards
and a different line under "Celebrations". Edit family/index.html, then run:

    python3 make_guest.py
"""
import re

page = open("family/index.html", encoding="utf-8").read()

# 1. remove everything between the family-only markers
page = re.sub(r"[ \t]*<!-- family-only:start.*?family-only:end -->\n", "", page, flags=re.S)

# 2. use the guest line under "Celebrations"
page = page.replace(
    '<p class="sub" data-i18n="celebSubFamily">Join us for all the celebrations</p>',
    '<p class="sub" data-i18n="celebSubGuest">Join us for the wedding and the reception</p>',
)
page = page.replace("This is the FAMILY page (all four events). guest/index.html is made from it by make_guest.py",
                    "This is the GUEST page. It is made from family/index.html by make_guest.py, so edit that file instead")

# 3. the link-preview address of the guest page
page = page.replace("/Wedding_Invite/family/", "/Wedding_Invite/guest/")

open("guest/index.html", "w", encoding="utf-8").write(page)
print("guest/index.html written")
