A few notes:

- To get the list of all supported countries from the api, we make a call to https://studies.cs.helsinki.fi/restcountries/api/all. This is EXTREMELY slow. We therefore used a caching solution with localstorage so that the user only has to wait for it once

- The recommended weather API gives catstrophicly bad results. I get a "connection reset" error 50% of the time on the same endpoint. The calls can also be extremely slow.

- The naming of the icons from the weather API is apparently nonsensical, some of them following a format of "01d.png" or "01n.png", and some other only available as "03d_n.png". This give rise to ugly bits of code to sanitize this madness.
 
