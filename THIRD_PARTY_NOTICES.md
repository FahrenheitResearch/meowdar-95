# Third-party notices

## BowEcho radar toolbox

Meowdar is designed for the browser bundle from
`FahrenheitResearch/bowecho-radar-toolbox`, pinned by the installer scripts to
release `v0.1.0` by default.

Upstream repository:
https://github.com/FahrenheitResearch/bowecho-radar-toolbox

The upstream project is offered under MIT and Apache-2.0 licenses. Retain the
license files copied into `vendor/` by the installer.

## BowEcho application

Meowdar's low-sweep workflow and professional control goals are informed by the
BowEcho application.

Upstream repository:
https://github.com/FahrenheitResearch/bowecho

## MapLibre GL JS

The production page loads the configured MapLibre GL JS release from a public
CDN and uses it to render the interactive basemap, radar canvas, site points,
and optional lightning layer.

Project:
https://maplibre.org/maplibre-gl-js/

License and notices are governed by the selected MapLibre release. Pin and
vendor the library locally when deployment policy requires supply-chain or
offline control.

## OpenStreetMap

The default raster basemap is rendered from OpenStreetMap tiles and data.
OpenStreetMap data is available under the Open Data Commons Open Database
License. Tile-server access is a separate best-effort service governed by the
OpenStreetMap Foundation tile usage policy.

Keep `© OpenStreetMap contributors` visible and follow the selected tile
provider's terms. For sustained or high-volume public traffic, configure a
suitable OSM-derived provider or self-hosted tiles.

Project:
https://www.openstreetmap.org/

Copyright and license:
https://www.openstreetmap.org/copyright

Tile usage policy:
https://operations.osmfoundation.org/policies/tiles/

## h5wasm

Optional client-side GOES GLM decoding uses `h5wasm`, pinned by the installer to
`0.10.3`. It is loaded only after the lightning overlay is enabled. The
installer copies the upstream license beside the vendored ESM/WASM files.

Upstream repository:
https://github.com/usnistgov/h5wasm

## NOAA NEXRAD and GOES data

BowEcho retrieves public NEXRAD Level II data directly in the visitor's browser.
The optional lightning layer retrieves public GOES-18 GLM Level 2 LCFA files
from NOAA's open archive. NOAA, NWS, NEXRAD, GOES, AWS, and upstream provider
names and marks belong to their respective owners. Availability, latency,
archive coverage, object layout, and browser access are controlled by those
providers.

GLM points displayed by Meowdar are total-lightning flash centroids, not exact
ground-strike positions or cloud-to-ground classifications.
