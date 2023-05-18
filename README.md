# Summary

This is a simple React app for showing Chicago Metra train schedules and suggesting which train to take. It's a work in progress, with limited capabilities now.

## Why?

My office is in the Loop in Chicago, and I live 3 miles away. My office is closet to Union Station, so Metra works best, not the L. Pre-pandemic, I preferred to ride my motorcycle and park in the gray zones. Chicago municipal code 9-64 parking regulations say it's legal if it's unmarked, and there were a number of small, unmarked spots. During the pandemic, the city updated their signage to close this loophole for most of the spots for reasons unknown. Apparently they hate fun. So when I don't want to take my chances being squished on a Divvy bike or scooter, I'll likely take the Metra. 

I can get a lot of this with Google Maps. However, Google Maps assumes I want to walk to the Western Ave train station (I don't, I want to drive). It is also cluttered and missing things like track number.

I can get other info in the Ventra app and Metra website. However, their UX is bizarre at best. It also assumes I know which train line I want because specific start and stop stations are specific to train lines. In my case, I want any train that stops at Western Ave because they all go to Union Station.

## Goals

- [x] Inbound train schedules between Western Ave and Union Station for 7:41-10:08am trains. Assumes 15 minutes needed to drive to the station and park
- [ ] Outbound train schedules between Union Station and Western Ave
- [ ] Dark mode
- [ ] Static schedule data parser
- [ ] Track numbers
- [ ] Pull drive time estimate
- [ ] Configurable buffer/parking time
- [ ] Github Actions to run tests, build the Docker container, and push to a private repository
- [ ] API endpoint to enable this for Siri with auth tokens and throttling
- [ ] Big pivot to crowdsourced and public residental zoned parking for motorcycles. Bikes can park in any residental zoned parking, and there must be some of the gray zones left
