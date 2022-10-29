import {base64} from "ethers/lib/utils";

const svgImage = `
<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs>
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css?family=Space+Grotesk:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic');
 </style>
</defs>
<g clip-path="url(#clip0_7667_539)">
<rect width="300" height="300" fill="#18181B"/>
<path opacity="0.05" d="M347.331 -24.3411C249.204 -131.185 81.309 -139.812 -27.6723 -43.6088C-136.654 52.5944 -145.453 217.197 -47.3254 324.041C50.8018 430.886 218.696 439.512 327.678 343.309C436.659 247.106 445.458 82.5033 347.331 -24.3411Z" stroke="#7E22CE" stroke-width="3.3" stroke-linecap="round" stroke-dasharray="3.9 8.7"/>
<path opacity="0.1" d="M-22.8585 331.581C79.5186 425.177 239.904 419.686 335.372 319.317C430.84 218.947 425.239 61.7068 322.862 -31.8894C220.485 -125.486 60.1 -119.995 -35.3682 -19.625C-130.836 80.7446 -125.236 237.985 -22.8585 331.581Z" stroke="#7E22CE" stroke-width="3.3" stroke-linecap="round" stroke-dasharray="14.7 9.9"/>
<path opacity="0.14" d="M22.0844 -50.8519C-90.9749 18.4101 -125.357 164.414 -54.7094 275.256C15.9379 386.099 164.862 419.806 277.921 350.544C390.98 281.282 425.362 135.278 354.715 24.436C284.067 -86.4064 135.144 -120.114 22.0844 -50.8519Z" stroke="#7E22CE" stroke-width="3" stroke-linecap="round" stroke-dasharray="3.9 15"/>
<path opacity="0.19" d="M162.005 -74.6679C35.5277 -81.1664 -72.3761 14.0856 -79.0045 138.083C-85.6329 262.081 11.5241 367.869 138.002 374.368C264.479 380.866 372.383 285.614 379.012 161.616C385.64 37.6186 288.483 -68.1695 162.005 -74.6679Z" stroke="#7E22CE" stroke-width="3" stroke-linecap="round" stroke-dasharray="14.4 16.5"/>
<path opacity="0.23" d="M19.2579 319.95C115.082 390.743 251.301 371.974 323.51 278.028C395.719 184.083 376.574 50.5355 280.75 -20.2576C184.925 -91.0508 48.7072 -72.2819 -23.5019 21.6638C-95.7109 115.609 -76.5667 249.157 19.2579 319.95Z" stroke="#7E22CE" stroke-width="3" stroke-linecap="round" stroke-dasharray="15.9 14.4"/>
<path opacity="0.28" d="M-25.8731 46.2411C-84.237 141.47 -52.8077 265.054 44.3261 322.274C141.46 379.493 267.516 348.68 325.879 253.451C384.243 158.222 352.814 34.6379 255.68 -22.5816C158.547 -79.8011 32.4908 -48.9881 -25.8731 46.2411Z" stroke="#7E22CE" stroke-width="3" stroke-linecap="round" stroke-dasharray="11.4 12.9"/>
<path opacity="0.32" d="M257.992 306.805C346.412 248.335 369.742 130.662 310.102 43.9759C250.462 -42.7103 130.436 -65.5836 42.0163 -7.113C-46.4035 51.3576 -69.7343 169.03 -10.0943 255.717C49.5457 342.403 169.572 365.276 257.992 306.805Z" stroke="#7E22CE" stroke-width="2.7" stroke-linecap="round" stroke-dasharray="6.6 5.4"/>
<path opacity="0.37" d="M106.204 -22.3757C9.18579 1.33927 -49.8534 97.6703 -25.6642 192.786C-1.47492 287.901 96.7828 345.783 193.801 322.068C290.818 298.353 349.858 202.022 325.668 106.906C301.479 11.7909 203.221 -46.0906 106.204 -22.3757Z" stroke="#7E22CE" stroke-width="2.7" stroke-linecap="round" stroke-dasharray="12 3.3"/>
<path opacity="0.41" d="M-10.7005 98.654C-39.5386 185.668 9.03327 279.127 97.7877 307.399C186.542 335.672 281.87 288.052 310.708 201.038C339.546 114.024 290.974 20.5656 202.22 -7.70701C113.465 -35.9796 18.1376 11.6398 -10.7005 98.654Z" stroke="#7E22CE" stroke-width="2.7" stroke-linecap="round" stroke-dasharray="7.2 10.2"/>
<path opacity="0.46" d="M218.786 11.5862C140.9 -25.6564 46.966 6.05343 8.97845 82.4122C-29.0091 158.771 3.33502 250.863 81.221 288.106C159.107 325.349 253.041 293.639 291.029 217.28C329.016 140.921 296.672 48.8289 218.786 11.5862Z" stroke="#7E22CE" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="11.1 10.5"/>
<path opacity="0.5" d="M13.9018 198.412C41.2601 272.104 124.373 310.1 199.539 283.278C274.705 256.456 313.461 174.973 286.103 101.281C258.745 27.5886 175.632 -10.4075 100.466 16.4144C25.2996 43.2362 -13.4565 124.719 13.9018 198.412Z" stroke="#7E22CE" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="6 11.1"/>
<path opacity="0.55" d="M66.45 48.6912C9.46628 93.931 0.679336 175.894 46.8239 231.76C92.9684 287.627 176.57 296.241 233.554 251.001C290.538 205.762 299.325 123.799 253.18 67.9325C207.036 12.0661 123.434 3.45147 66.45 48.6912Z" stroke="#7E22CE" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="15 12.3"/>
<path opacity="0.59" d="M31.1409 129.298C19.5658 193.657 63.3987 255.03 129.045 266.378C194.69 277.726 257.29 234.752 268.866 170.394C280.441 106.035 236.608 44.6625 170.962 33.3144C105.316 21.9662 42.716 64.9397 31.1409 129.298Z" stroke="#7E22CE" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="11.4 4.5"/>
<path opacity="0.64" d="M142.426 256.083C202.272 260.186 254.18 215.948 258.365 157.275C262.55 98.602 217.427 47.7121 157.581 43.6092C97.734 39.5064 45.8262 83.7444 41.6414 142.417C37.4565 201.091 82.5792 251.98 142.426 256.083Z" stroke="#7E22CE" stroke-width="2.1" stroke-linecap="round" stroke-dasharray="12.3 16.2"/>
<path opacity="0.68" d="M59.2679 182.223C77.5068 231.351 132.915 256.682 183.026 238.801C233.137 220.92 258.974 166.598 240.735 117.469C222.496 68.3412 167.088 43.0105 116.977 60.8917C66.8664 78.7729 41.0291 133.095 59.2679 182.223Z" stroke="#7E22CE" stroke-width="2.1" stroke-linecap="round" stroke-dasharray="7.8 11.7"/>
<path opacity="0.73" d="M205.431 212.359C240.646 182.347 244.378 130.029 213.766 95.5043C183.153 60.9794 129.789 57.3209 94.5738 87.3331C59.3583 117.345 55.6268 169.663 86.2391 204.188C116.851 238.713 170.215 242.371 205.431 212.359Z" stroke="#7E22CE" stroke-width="2.1" stroke-linecap="round" stroke-dasharray="15.3 5.4"/>
<path opacity="0.77" d="M162.577 79.9273C123.19 73.1184 85.6296 98.9025 78.6845 137.518C71.7394 176.133 98.0392 212.956 137.427 219.765C176.814 226.574 214.374 200.79 221.319 162.175C228.264 123.56 201.965 86.7362 162.577 79.9273Z" stroke="#7E22CE" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="16.5 9.9"/>
<path opacity="0.82" d="M140.562 208.283C173.481 213.394 204.394 191.375 209.607 159.102C214.821 126.828 192.362 96.5216 159.443 91.4099C126.524 86.2983 95.6112 108.317 90.3974 140.591C85.1835 172.864 107.643 203.171 140.562 208.283Z" stroke="#7E22CE" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="9 6.3"/>
<path opacity="0.86" d="M197.227 159.687C202.77 134.118 186.122 108.984 160.041 103.549C133.96 98.1137 108.323 114.436 102.78 140.005C97.2362 165.575 113.885 190.709 139.966 196.144C166.046 201.578 191.683 185.256 197.227 159.687Z" stroke="#7E22CE" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="15.6 8.1"/>
<path opacity="0.91" d="M158.148 115.257C138.663 110.847 119.221 122.758 114.722 141.861C110.224 160.964 122.373 180.025 141.858 184.435C161.343 188.845 180.785 176.935 185.284 157.832C189.782 138.729 177.633 119.667 158.148 115.257Z" stroke="#7E22CE" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="11.1 11.7"/>
<path opacity="0.95" d="M164.864 168.495C175.37 160.448 177.232 145.575 169.025 135.276C160.817 124.976 145.647 123.15 135.141 131.197C124.636 139.244 122.773 154.117 130.981 164.416C139.189 174.716 154.359 176.542 164.864 168.495Z" stroke="#7E22CE" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="11.4 9.6"/>
<path d="M140.623 142.399C136.428 147.478 137.227 154.929 142.407 159.042C147.588 163.155 155.188 162.372 159.383 157.293C163.578 152.214 162.779 144.763 157.599 140.65C152.418 136.538 144.818 137.321 140.623 142.399Z" stroke="#7E22CE" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="12.6 15"/>
<circle cx="150.151" cy="150.15" r="136.35" fill="#7E22CE"/>
<g clip-path="url(#clip1_7667_539)">
<path opacity="0.05" d="M261.074 49.988C205.839 -11.3566 111.333 -16.3095 49.9883 38.9255C-11.3564 94.1605 -16.3093 188.667 38.9257 250.012C94.1607 311.356 188.667 316.309 250.012 261.074C311.356 205.839 316.309 111.333 261.074 49.988Z" stroke="white" stroke-opacity="0.1" stroke-width="3.3" stroke-linecap="round" stroke-dasharray="3.9 8.7"/>
<path opacity="0.1" d="M52.6989 254.343C110.326 308.081 200.606 304.929 254.344 247.301C308.082 189.674 304.929 99.3948 247.302 45.6566C189.675 -8.08159 99.3956 -4.92896 45.6574 52.6982C-8.08086 110.325 -4.92823 200.605 52.6989 254.343Z" stroke="white" stroke-opacity="0.1" stroke-width="3.3" stroke-linecap="round" stroke-dasharray="14.7 9.9"/>
<path opacity="0.14" d="M77.9955 34.7694C14.3554 74.5361 -4.99782 158.364 34.769 222.004C74.5357 285.644 158.364 304.997 222.004 265.231C285.644 225.464 304.997 141.636 265.23 77.9959C225.463 14.3558 141.636 -4.99741 77.9955 34.7694Z" stroke="white" stroke-opacity="0.1" stroke-width="3" stroke-linecap="round" stroke-dasharray="3.9 15"/>
<path opacity="0.19" d="M156.755 21.0932C85.5619 17.3621 24.8237 72.051 21.0927 143.244C17.3616 214.437 72.0504 275.176 143.244 278.907C214.437 282.638 275.175 227.949 278.906 156.756C282.637 85.5624 227.948 24.8243 156.755 21.0932Z" stroke="white" stroke-opacity="0.1" stroke-width="3" stroke-linecap="round" stroke-dasharray="14.4 16.5"/>
<path opacity="0.23" d="M76.405 247.665C130.344 288.311 207.02 277.535 247.666 223.596C288.312 169.657 277.535 92.9809 223.597 52.3351C169.658 11.6892 92.9817 22.4653 52.3358 76.4042C11.69 130.343 22.4661 207.019 76.405 247.665Z" stroke="white" stroke-opacity="0.1" stroke-width="3" stroke-linecap="round" stroke-dasharray="15.9 14.4"/>
<path opacity="0.28" d="M51.001 90.5151C18.1485 145.191 35.8397 216.147 90.5155 248.999C145.191 281.852 216.147 264.16 249 209.485C281.852 154.809 264.161 83.8531 209.485 51.0006C154.809 18.148 83.8536 35.8393 51.001 90.5151Z" stroke="white" stroke-opacity="0.1" stroke-width="3" stroke-linecap="round" stroke-dasharray="11.4 12.9"/>
<path opacity="0.32" d="M210.784 240.118C260.555 206.547 273.688 138.985 240.117 89.2145C206.546 39.4437 138.985 26.311 89.2137 59.8819C39.4429 93.4527 26.3102 161.014 59.8811 210.785C93.4519 260.556 161.014 273.689 210.784 240.118Z" stroke="white" stroke-opacity="0.1" stroke-width="2.7" stroke-linecap="round" stroke-dasharray="6.6 5.4"/>
<path opacity="0.37" d="M125.347 51.1191C70.736 64.735 37.5034 120.043 51.1193 174.654C64.7352 229.264 120.044 262.497 174.654 248.881C229.265 235.265 262.497 179.957 248.881 125.346C235.265 70.7358 179.957 37.5031 125.347 51.1191Z" stroke="white" stroke-opacity="0.1" stroke-width="2.7" stroke-linecap="round" stroke-dasharray="12 3.3"/>
<path opacity="0.41" d="M59.5416 120.608C43.3089 170.567 70.6495 224.226 120.609 240.459C170.568 256.692 224.227 229.351 240.46 179.392C256.692 129.433 229.352 75.7736 179.393 59.5409C129.433 43.3082 75.7743 70.6489 59.5416 120.608Z" stroke="white" stroke-opacity="0.1" stroke-width="2.7" stroke-linecap="round" stroke-dasharray="7.2 10.2"/>
<path opacity="0.46" d="M188.716 70.6181C144.875 49.2353 92.0004 67.4415 70.6175 111.283C49.2347 155.124 67.4409 207.999 111.282 229.382C155.124 250.765 207.998 232.558 229.381 188.717C250.764 144.876 232.558 92.001 188.716 70.6181Z" stroke="white" stroke-opacity="0.1" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="11.1 10.5"/>
<path opacity="0.5" d="M73.3905 177.884C88.7903 220.194 135.574 242.01 177.884 226.61C220.195 211.21 242.01 164.427 226.61 122.116C211.211 79.8058 164.427 57.9903 122.117 73.3901C79.8062 88.7898 57.9908 135.573 73.3905 177.884Z" stroke="white" stroke-opacity="0.1" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="6 11.1"/>
<path opacity="0.55" d="M102.97 91.9218C70.894 117.896 65.9479 164.955 91.9223 197.031C117.897 229.106 164.956 234.053 197.031 208.078C229.107 182.104 234.053 135.045 208.079 102.969C182.104 70.8935 135.045 65.9474 102.97 91.9218Z" stroke="white" stroke-opacity="0.1" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="15 12.3"/>
<path opacity="0.59" d="M83.0925 138.203C76.5769 175.154 101.25 210.391 138.202 216.907C175.153 223.422 210.39 198.749 216.906 161.797C223.421 124.846 198.748 89.609 161.797 83.0934C124.845 76.5779 89.608 101.251 83.0925 138.203Z" stroke="white" stroke-opacity="0.1" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="11.4 4.5"/>
<path opacity="0.64" d="M145.735 210.996C179.422 213.352 208.641 187.952 210.996 154.265C213.352 120.578 187.953 91.3597 154.265 89.004C120.578 86.6484 91.3599 112.048 89.0043 145.735C86.6486 179.422 112.048 208.64 145.735 210.996Z" stroke="white" stroke-opacity="0.1" stroke-width="2.1" stroke-linecap="round" stroke-dasharray="12.3 16.2"/>
<path opacity="0.68" d="M98.9271 168.589C109.194 196.796 140.382 211.34 168.589 201.073C196.796 190.807 211.34 159.618 201.074 131.411C190.807 103.204 159.618 88.6603 131.411 98.9268C103.204 109.193 88.6606 140.382 98.9271 168.589Z" stroke="white" stroke-opacity="0.1" stroke-width="2.1" stroke-linecap="round" stroke-dasharray="7.8 11.7"/>
<path opacity="0.73" d="M181.201 185.892C201.023 168.661 203.124 138.622 185.892 118.8C168.661 98.9773 138.623 96.8769 118.8 114.108C98.9775 131.34 96.877 161.378 114.108 181.2C131.34 201.023 161.378 203.123 181.201 185.892Z" stroke="white" stroke-opacity="0.1" stroke-width="2.1" stroke-linecap="round" stroke-dasharray="15.3 5.4"/>
<path opacity="0.77" d="M157.077 109.856C134.907 105.947 113.764 120.751 109.855 142.922C105.946 165.092 120.75 186.235 142.92 190.144C165.091 194.053 186.234 179.249 190.143 157.078C194.052 134.908 179.248 113.765 157.077 109.856Z" stroke="white" stroke-opacity="0.1" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="16.5 9.9"/>
<path opacity="0.82" d="M144.685 183.551C163.215 186.486 180.615 173.844 183.55 155.314C186.485 136.784 173.843 119.384 155.313 116.449C136.783 113.514 119.383 126.156 116.448 144.686C113.513 163.216 126.155 180.616 144.685 183.551Z" stroke="white" stroke-opacity="0.1" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="9 6.3"/>
<path opacity="0.86" d="M176.581 155.65C179.701 140.97 170.33 126.539 155.649 123.418C140.969 120.298 126.538 129.669 123.418 144.35C120.297 159.031 129.669 173.461 144.349 176.582C159.03 179.702 173.461 170.331 176.581 155.65Z" stroke="white" stroke-opacity="0.1" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="15.6 8.1"/>
<path opacity="0.91" d="M154.584 130.141C143.616 127.609 132.672 134.447 130.14 145.415C127.608 156.383 134.446 167.327 145.414 169.859C156.382 172.391 167.326 165.553 169.858 154.585C172.39 143.617 165.552 132.673 154.584 130.141Z" stroke="white" stroke-opacity="0.1" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="11.1 11.7"/>
<path opacity="0.95" d="M158.366 160.707C164.279 156.087 165.328 147.548 160.708 141.635C156.088 135.721 147.549 134.673 141.635 139.293C135.722 143.913 134.673 152.452 139.293 158.365C143.913 164.279 152.452 165.327 158.366 160.707Z" stroke="white" stroke-opacity="0.1" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="11.4 9.6"/>
<path d="M144.719 145.724C142.358 148.64 142.808 152.918 145.724 155.28C148.64 157.641 152.918 157.191 155.279 154.275C157.64 151.359 157.191 147.081 154.275 144.72C151.359 142.359 147.081 142.808 144.719 145.724Z" stroke="white" stroke-opacity="0.1" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="12.6 15"/>
</g>
<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Space Grotesk" font-size="14.4" font-weight="500" letter-spacing="0em"><tspan x="51.9769" y="231.982">Proof of Github Membership</tspan></text>
<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Space Grotesk" font-size="9.6" font-weight="bold" letter-spacing="0em"><tspan x="161.367" y="251.722">GitGate</tspan></text>
<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Space Grotesk" font-size="9.6" letter-spacing="0em"><tspan x="104.339" y="251.722">Powered by </tspan></text>
<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Space Grotesk" font-size="20" font-weight="bold" letter-spacing="0em">
  <tspan  x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">{REPLACE}</tspan>
</text>
</g>
<defs>
<clipPath id="clip0_7667_539">
<rect width="300" height="300" fill="white"/>
</clipPath>
<clipPath id="clip1_7667_539">
<rect width="329.4" height="329.4" fill="white" transform="translate(-14.6992 -14.7)"/>
</clipPath>
</defs>
</svg>
`;

export function shortenHex(hex: string, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

export const isFlask = async () => {
  if (typeof window !== "undefined") {
    const provider = window.ethereum;

    try {
      const clientVersion = await provider?.request({
        method: "web3_clientVersion",
      });

      const isFlaskDetected = (clientVersion as unknown as string[])?.includes(
        "flask"
      );

      return Boolean(provider && isFlaskDetected);
    } catch {
      return false;
    }
  }
  return false;
};

export const getSvg = (repoName: string) => {
  return btoa(svgImage.toString().replace("{REPLACE}", repoName));
};
