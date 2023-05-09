# AltSchool Africa School of Back End Engineering Capstone Projects

## Scissor
Brief is the new black, this is what inspires the team at Scissor. In today’s world, it’s important to
keep things as short as possible, and this applies to more concepts than you may realize. From 
music, speeches, to wedding receptions, brief is the new black. Scissor is a simple tool which 
makes URLs as short as possible. Scissor thinks it can disrupt the URL shortening industry and 
give the likes of bit.ly and ow.ly a run for their money within 2 years.
### Requirements And Implementation Guide:
- URL Shortening:
Scissor allows users to shorten URLs by pasting a long URL into the Scissor platform and a 
shorter URL gets automatically generated. The shortened URL is designed to be as short as 
possible, making it easy to share on social media or through other channels.
- Custom URLs:
Scissor also allows users to customize their shortened URLs. Users can choose their own 
custom domain name and customize the URL to reflect their brand or content. This feature is 
particularly useful for individuals or small businesses who want to create branded links for their 
- QR Code Generation:
Scissor allows users to also generate QR codes for the shortened URLs. Users can download 
the QR code image and use it in their promotional materials or/and on their website. This 
feature will be implemented using a third-party QR code generator API, which can be integrated 
into the Scissor platform.
- Analytics:
Scissor provides basic analytics that allow users to track their shortened URL's performance. 
Users can see how many clicks their shortened URL has received and where the clicks are 
coming from. We need to track when a URL is used.
- Link History:
Scissor allows users to see the history of links they’ve created so they can easily find and reuse 
links they have previously created
Best Practices:
1. You are required to build with either Nodejs(TypeScript),, Goland or Python.
2. Ensure you are validating the URL to be a valid url before creating a shortened version 
of it. This is to prevent broken links.
3. Don't always hit the DB, use a cache-layer.
4. Ensure you add rate limiting[{{type}} Annotation][{{type}} Annotation]
5. Ensure you write unit and integration tests where possible
6. Better if you can spec and document the API with OpenAPI using something like 
https://stoplight.io/
Best Practices:
