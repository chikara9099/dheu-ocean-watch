# Sea Surface Roughness API

This API calculates the average sea surface roughness proxy from Sentinel-1 SAR satellite data (VV polarization) for a specified geographic region and time range.
---

## API Endpoint

`POST /average-sea-roughness`

---
## Prerequisites

- You must have a valid **Copernicus Data Space Ecosystem (CDSE) Sentinel Hub OAuth Client**.
- Obtain your **Client ID** and **Client Secret** from the Sentinel Hub dashboard inside the CDSE portal.
- Set these credentials in your environment variables or `.env` file as:

## Request

### Query Parameters

- `start_date` (string, required): Start date for the data interval in `YYYY-MM-DD` format.
- `end_date` (string, required): End date for the data interval in `YYYY-MM-DD` format.
- `width` (integer, optional): Output image width in pixels. Default is 512.
- `height` (integer, optional): Output image height in pixels. Default is 512.

### Request Body (JSON)
The bounding box specifying the geographic region of interest.
{
    "west": float, // Western longitude (degrees)
    "south": float, // Southern latitude (degrees)
    "east": float, // Eastern longitude (degrees)
    "north": float // Northern latitude (degrees)
}

### Example Request
POST /average-sea-roughness?start_date=2025-09-25&end_date=2025-10-02&width=512&height=512
Content-Type: application/json

{
"west": 88,
"south": 20,
"east": 92,
"north": 22
}

---

## Response

Returns a JSON object with:

- `bounding_box` (array): The bounding box `[west, south, east, north]` used for the query.
- `time_range` (object): The start and end dates used.
- `average_sea_roughness_vv` (float): Average VH polarization radar backscatter intensity, proxy for sea surface roughness.
- `valid_pixels_count` (integer): Number of data pixels used in the calculation.

### Example Response

{
    "bounding_box": [
        88.0,
        20.0,
        92.0,
        22.0
    ],
    "time_range": {
        "start": "2025-09-25",
        "end": "2025-10-02"
    },
    "average_sea_roughness_vv": 0.03151373192667961,
    "valid_pixels_count": 251595
}


---

## Notes

- Bounding box coordinates should represent an oceanic area.
- Dates must correspond to available Sentinel-1 acquisitions.
- The returned sea roughness value is a dimensionless average backscatter indicating relative surface roughness.

---
