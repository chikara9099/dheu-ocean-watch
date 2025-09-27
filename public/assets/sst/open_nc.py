import os
import xarray as xr
import matplotlib.pyplot as plt
import cartopy.crs as ccrs
import cartopy.feature as cfeature
import re

# Folder containing your .nc files
nc_dir = r"J:\Projects\dheu\dheu-ocean-watch\assets\sss\SMAP_RSS_L3_SSS_SMI_MONTHLY_V5.3_5.3-20250927_093057"

# Output folder for PNGs
out_dir = os.path.join(nc_dir, "pngs")
os.makedirs(out_dir, exist_ok=True)

# Regex to extract yyyy and mm
pattern = re.compile(r"RSS_smap_SSS_L3_monthly_(\d{4})_(\d{2})_FNL_v05\.3\.nc")

for file in os.listdir(nc_dir):
    if file.endswith(".nc"):
        match = pattern.match(file)
        if not match:
            continue  # skip files not matching format
        year, month = match.groups()

        # Open dataset
        filepath = os.path.join(nc_dir, file)
        ds = xr.open_dataset(filepath)
        salinity = ds["sss_smap"]

        # Plot with Cartopy
        fig = plt.figure(figsize=(12, 6))
        ax = plt.axes(projection=ccrs.PlateCarree())

        # Plot salinity
        salinity.plot(
            ax=ax,
            transform=ccrs.PlateCarree(),
            cmap="viridis",
            cbar_kwargs={"label": "Sea Surface Salinity [psu]"},
            add_colorbar=True,
            add_labels=False
        )

        # Land in black
        ax.coastlines(resolution="110m", color="black", linewidth=1)
        ax.add_feature(cfeature.LAND, facecolor="black")

        # Title
        ax.set_title(f"SMAP Sea Surface Salinity ({month}-{year})")

        # Save as PNG in format mm_yyyy
        out_path = os.path.join(out_dir, f"{month}_{year}.png")
        plt.savefig(out_path, dpi=300, bbox_inches="tight")
        plt.close(fig)

        print(f"Saved {out_path}")
