#!/usr/bin/env bash
set -euo pipefail

VERSION="${BOWECHO_VERSION:-v0.1.0}"
REPOSITORY="FahrenheitResearch/bowecho-radar-toolbox"
ASSET="bowecho-user-side-radar.zip"
URL="https://github.com/${REPOSITORY}/releases/download/${VERSION}/${ASSET}"
H5WASM_VERSION="${H5WASM_VERSION:-0.10.3}"
H5WASM_ASSET="h5wasm-${H5WASM_VERSION}.tgz"
H5WASM_URL="https://registry.npmjs.org/h5wasm/-/${H5WASM_ASSET}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENDOR_DIR="${ROOT}/vendor"
TEMP_DIR="$(mktemp -d)"

cleanup() {
  rm -rf "${TEMP_DIR}"
}
trap cleanup EXIT

for command in curl unzip find tar; do
  if ! command -v "${command}" >/dev/null 2>&1; then
    echo "Missing required command: ${command}" >&2
    exit 1
  fi
done

echo "Downloading BowEcho radar toolbox ${VERSION}..."
curl --fail --location --retry 3 --retry-delay 2 \
  --output "${TEMP_DIR}/${ASSET}" "${URL}"

unzip -q "${TEMP_DIR}/${ASSET}" -d "${TEMP_DIR}/unpacked"
ENTRYPOINT="$(find "${TEMP_DIR}/unpacked" -type f -name radar-toolbox.js -print -quit)"

if [[ -z "${ENTRYPOINT}" ]]; then
  echo "Could not find radar-toolbox.js in the release archive." >&2
  exit 1
fi

SOURCE_WEB_DIR="$(dirname "${ENTRYPOINT}")"
mkdir -p "${VENDOR_DIR}"
find "${VENDOR_DIR}" -mindepth 1 -maxdepth 1 \
  ! -name 'INSTALL-BOWECHO.txt' -exec rm -rf {} +
cp -a "${SOURCE_WEB_DIR}/." "${VENDOR_DIR}/"

echo "Downloading h5wasm ${H5WASM_VERSION} for optional client-side GLM decoding..."
curl --fail --location --retry 3 --retry-delay 2 \
  --output "${TEMP_DIR}/${H5WASM_ASSET}" "${H5WASM_URL}"
mkdir -p "${TEMP_DIR}/h5wasm" "${VENDOR_DIR}/h5wasm"
tar -xzf "${TEMP_DIR}/${H5WASM_ASSET}" -C "${TEMP_DIR}/h5wasm"
cp -a "${TEMP_DIR}/h5wasm/package/dist/esm/." "${VENDOR_DIR}/h5wasm/"
if [[ -f "${TEMP_DIR}/h5wasm/package/LICENSE.txt" ]]; then
  cp "${TEMP_DIR}/h5wasm/package/LICENSE.txt" "${VENDOR_DIR}/h5wasm/LICENSE.txt"
fi
printf '%s\n' "${H5WASM_VERSION}" > "${VENDOR_DIR}/h5wasm/H5WASM_VERSION"

# Preserve upstream license files beside the vendored browser bundle when present.
for license_name in LICENSE-MIT LICENSE-APACHE; do
  license_path="$(find "${TEMP_DIR}/unpacked" -type f -name "${license_name}" -print -quit)"
  if [[ -n "${license_path}" ]]; then
    cp "${license_path}" "${VENDOR_DIR}/${license_name}"
  fi
done

required=(
  "radar-toolbox.js"
  "worker.js"
  "pkg/bowecho_client_wasm.js"
  "pkg/bowecho_client_wasm_bg.wasm"
  "h5wasm/hdf5_hl.js"
)

for relative_path in "${required[@]}"; do
  if [[ ! -f "${VENDOR_DIR}/${relative_path}" ]]; then
    echo "Vendor install is incomplete; missing ${relative_path}." >&2
    exit 1
  fi
done

if ! find "${VENDOR_DIR}/h5wasm" -maxdepth 1 -type f -name '*.wasm' -print -quit | grep -q .; then
  echo "Vendor install is incomplete; h5wasm WebAssembly file is missing." >&2
  exit 1
fi

printf '%s\n' "${VERSION}" > "${VENDOR_DIR}/BOWECHO_VERSION"
echo "BowEcho installed in ${VENDOR_DIR}"
echo "Next: cd \"${ROOT}\" && python3 -m http.server 8790"
