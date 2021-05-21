import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";
import { useState } from "react";

import styles from "./header.module.css";

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const [session, loading] = useSession();
  const [dropdown, setDropdown] = useState(false);

  return (
    <header className="header-section">
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <div className="text-center">
              <span className={styles.notSignedInText}>
                You are not signed in &nbsp;
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </a>
            </div>
          )}
          {session && (
            <>
              <div className="container">
                <div className="row d-flex align-items-center justify-content-center">
                  <div className="col-6 text-left">
                    <svg
                      width="230"
                      height="48"
                      viewBox="0 0 230 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M68.3681 43.4346C67.4396 43.4346 66.5111 43.4036 65.5826 43.3417C64.6541 43.2798 63.6947 43.156 62.6733 42.9394V26.3812C63.4471 26.2265 64.3137 26.1336 65.2731 26.0408C66.2016 25.9789 67.0682 25.917 67.8729 25.917C68.9561 25.917 69.9465 26.0098 70.875 26.1646C71.7726 26.3193 72.5773 26.5979 73.2272 26.9693C73.8772 27.3407 74.4033 27.8359 74.7747 28.4549C75.1461 29.0739 75.3318 29.8167 75.3318 30.7452C75.3318 32.1069 74.6818 33.1902 73.351 33.9639C74.4342 34.3663 75.177 34.9234 75.5794 35.6352C75.9817 36.3471 76.1674 37.1518 76.1674 38.0183C76.1674 39.8134 75.5175 41.1443 74.2176 42.0728C72.8868 42.9703 70.9369 43.4346 68.3681 43.4346ZM66.4183 32.8497H68.3062C69.4823 32.8497 70.3489 32.695 70.8441 32.3855C71.3393 32.076 71.6178 31.5808 71.6178 30.9308C71.6178 30.25 71.3702 29.7548 70.8441 29.4762C70.3179 29.1977 69.5442 29.0429 68.5229 29.0429C68.1824 29.0429 67.8419 29.0429 67.4706 29.0429C67.0992 29.0429 66.7587 29.0739 66.4492 29.1048V32.8497H66.4183ZM66.4183 35.759V40.1848C66.6968 40.2158 67.0063 40.2467 67.3158 40.2467C67.6562 40.2777 67.9967 40.2777 68.399 40.2777C69.5442 40.2777 70.4727 40.1229 71.1845 39.7825C71.8964 39.442 72.2368 38.854 72.2368 37.9564C72.2368 37.1827 71.9273 36.5947 71.3393 36.2542C70.7512 35.9138 69.9156 35.759 68.8014 35.759H66.4183Z"
                        fill="#55C0C7"
                      />
                      <path
                        d="M86.8142 33.4993C86.4738 33.4064 86.1024 33.3445 85.6691 33.2517C85.2358 33.1588 84.7406 33.1279 84.2454 33.1279C84.0288 33.1279 83.7502 33.1588 83.4098 33.1898C83.1003 33.2207 82.8527 33.2826 82.6979 33.3136V43.2175H79.0149V30.9614C79.6648 30.7448 80.4386 30.5281 81.3361 30.3115C82.2337 30.0948 83.2241 30.002 84.3382 30.002C84.5239 30.002 84.7715 30.002 85.0501 30.0329C85.3286 30.0639 85.6072 30.0948 85.8857 30.1258C86.1643 30.1567 86.4428 30.2186 86.7214 30.2805C86.9999 30.3424 87.2475 30.4043 87.4332 30.4972L86.8142 33.4993Z"
                        fill="#55C0C7"
                      />
                      <path
                        d="M101.268 36.7181C101.268 37.7395 101.113 38.668 100.834 39.5036C100.525 40.3392 100.123 41.082 99.5655 41.6701C99.0084 42.2581 98.3275 42.7224 97.5537 43.0628C96.78 43.4033 95.9134 43.558 94.923 43.558C93.9636 43.558 93.097 43.4033 92.3232 43.0628C91.5495 42.7224 90.8686 42.2581 90.3115 41.6701C89.7544 41.082 89.3211 40.3392 89.0116 39.5036C88.7021 38.668 88.5474 37.7395 88.5474 36.7181C88.5474 35.6968 88.7021 34.7683 89.0426 33.9326C89.3521 33.097 89.8163 32.3852 90.3734 31.7971C90.9305 31.2091 91.6114 30.7448 92.3851 30.4044C93.1589 30.0639 94.0255 29.9092 94.923 29.9092C95.8515 29.9092 96.7181 30.0639 97.4918 30.4044C98.2656 30.7448 98.9465 31.1781 99.5036 31.7971C100.061 32.3852 100.494 33.097 100.803 33.9326C101.113 34.7683 101.268 35.6968 101.268 36.7181ZM97.5228 36.7181C97.5228 35.573 97.3061 34.7064 96.8419 34.0565C96.3777 33.4065 95.7587 33.097 94.8921 33.097C94.0564 33.097 93.4065 33.4065 92.9422 34.0565C92.478 34.7064 92.2613 35.6039 92.2613 36.7181C92.2613 37.8323 92.478 38.7608 92.9422 39.4108C93.4065 40.0607 94.0564 40.4012 94.8921 40.4012C95.7277 40.4012 96.3777 40.0607 96.8419 39.4108C97.3061 38.7299 97.5228 37.8323 97.5228 36.7181Z"
                        fill="#55C0C7"
                      />
                      <path
                        d="M107.767 34.8923C108.139 34.4899 108.51 34.0876 108.881 33.6543C109.253 33.221 109.655 32.8186 109.996 32.3854C110.367 31.983 110.707 31.5807 111.017 31.2093C111.326 30.8379 111.605 30.4974 111.853 30.2189H116.216C115.35 31.2093 114.483 32.1687 113.679 33.0972C112.843 33.9947 111.945 34.9542 110.955 35.9136C111.45 36.3469 111.945 36.904 112.472 37.4921C112.998 38.1111 113.493 38.761 113.988 39.4109C114.483 40.0609 114.948 40.7418 115.35 41.3917C115.752 42.0417 116.093 42.6607 116.371 43.1868H112.162C111.914 42.7535 111.605 42.2893 111.265 41.7631C110.924 41.237 110.584 40.7108 110.181 40.2156C109.81 39.6895 109.408 39.1943 108.974 38.7301C108.541 38.2658 108.139 37.8635 107.736 37.523V43.2178H104.053V24.6789L107.736 24.0908V34.8923H107.767Z"
                        fill="#55C0C7"
                      />
                      <path
                        d="M116.866 36.8419C116.866 35.6968 117.052 34.6755 117.393 33.8089C117.733 32.9423 118.197 32.2304 118.785 31.6424C119.373 31.0543 120.023 30.621 120.766 30.3425C121.509 30.033 122.283 29.9092 123.056 29.9092C124.882 29.9092 126.337 30.4663 127.42 31.6114C128.473 32.7256 129.03 34.3969 129.03 36.5634C129.03 36.78 129.03 36.9967 128.999 37.2752C128.968 37.5228 128.968 37.7704 128.937 37.9561H120.611C120.704 38.6989 121.045 39.3179 121.664 39.7512C122.283 40.1845 123.118 40.4012 124.171 40.4012C124.851 40.4012 125.501 40.3392 126.151 40.2154C126.801 40.0916 127.327 39.9369 127.73 39.7512L128.225 42.7224C128.039 42.8152 127.761 42.9081 127.451 43.0319C127.111 43.1247 126.77 43.2176 126.368 43.2795C125.966 43.3414 125.532 43.4033 125.068 43.4652C124.604 43.5271 124.14 43.5271 123.675 43.5271C122.499 43.5271 121.509 43.3414 120.642 43.0009C119.776 42.6605 119.064 42.1962 118.507 41.5772C117.95 40.9892 117.516 40.2773 117.238 39.4417C116.99 38.668 116.866 37.7704 116.866 36.8419ZM125.501 35.4182C125.47 35.1087 125.44 34.7992 125.347 34.5207C125.254 34.2112 125.13 33.9636 124.913 33.747C124.728 33.5303 124.48 33.3137 124.202 33.1899C123.923 33.0351 123.552 32.9732 123.118 32.9732C122.716 32.9732 122.345 33.0351 122.066 33.1899C121.757 33.3446 121.509 33.4994 121.323 33.747C121.138 33.9636 120.983 34.2421 120.859 34.5516C120.766 34.8611 120.673 35.1706 120.611 35.4801H125.501V35.4182Z"
                        fill="#55C0C7"
                      />
                      <path
                        d="M139.676 33.4993C139.336 33.4064 138.964 33.3445 138.531 33.2517C138.098 33.1588 137.603 33.1279 137.107 33.1279C136.891 33.1279 136.612 33.1588 136.272 33.1898C135.962 33.2207 135.715 33.2826 135.56 33.3136V43.2175H131.877V30.9614C132.527 30.7448 133.301 30.5281 134.198 30.3115C135.096 30.0948 136.086 30.002 137.2 30.002C137.386 30.002 137.634 30.002 137.912 30.0329C138.191 30.0639 138.469 30.0948 138.748 30.1258C139.026 30.1567 139.305 30.2186 139.583 30.2805C139.862 30.3424 140.11 30.4043 140.295 30.4972L139.676 33.4993Z"
                        fill="#55C0C7"
                      />
                      <path
                        d="M147.166 40.2778C147.723 40.2778 148.157 40.2469 148.497 40.154C148.838 40.0612 149.147 39.9374 149.333 39.7826C149.549 39.6279 149.704 39.4422 149.766 39.2255C149.859 39.0089 149.89 38.7613 149.89 38.5137C149.89 37.9566 149.642 37.4923 149.116 37.1209C148.59 36.7496 147.692 36.3472 146.393 35.9139C145.835 35.7282 145.278 35.4806 144.721 35.233C144.164 34.9854 143.669 34.645 143.205 34.2736C142.771 33.9022 142.4 33.407 142.121 32.8808C141.843 32.3238 141.688 31.6738 141.688 30.8691C141.688 30.0644 141.843 29.3835 142.121 28.7336C142.431 28.1146 142.833 27.5575 143.39 27.1242C143.947 26.6909 144.597 26.3504 145.371 26.1028C146.145 25.8552 147.012 25.7314 147.971 25.7314C149.116 25.7314 150.106 25.8552 150.942 26.1028C151.778 26.3504 152.459 26.629 153.016 26.9075L151.902 29.9406C151.437 29.693 150.88 29.4764 150.323 29.2907C149.735 29.105 149.023 29.0121 148.219 29.0121C147.29 29.0121 146.64 29.1359 146.238 29.3835C145.835 29.6311 145.619 30.0335 145.619 30.5596C145.619 30.8691 145.681 31.1477 145.835 31.3334C145.99 31.55 146.207 31.7357 146.454 31.9214C146.733 32.1071 147.042 32.2618 147.383 32.3856C147.723 32.5404 148.126 32.6642 148.559 32.8189C149.457 33.1594 150.23 33.4689 150.88 33.7784C151.53 34.0879 152.087 34.4593 152.521 34.8926C152.954 35.3259 153.294 35.8211 153.48 36.4091C153.697 36.9972 153.79 37.678 153.79 38.5137C153.79 40.0921 153.232 41.3301 152.118 42.2277C151.004 43.0943 149.333 43.5585 147.073 43.5585C146.331 43.5585 145.65 43.5276 145.031 43.4347C144.412 43.3419 143.886 43.2181 143.421 43.0943C142.957 42.9705 142.555 42.8157 142.214 42.661C141.874 42.5062 141.595 42.3824 141.379 42.2277L142.462 39.1636C142.957 39.4422 143.607 39.6898 144.35 39.9064C145.155 40.154 146.083 40.2778 147.166 40.2778Z"
                        fill="#3F82BC"
                      />
                      <path
                        d="M167.655 42.7537C167.036 42.9394 166.231 43.0941 165.241 43.2489C164.251 43.4036 163.229 43.4965 162.146 43.4965C161.032 43.4965 160.134 43.3417 159.391 43.0632C158.649 42.7537 158.092 42.3513 157.658 41.8252C157.225 41.2991 156.915 40.6491 156.761 39.9063C156.575 39.1635 156.482 38.3588 156.482 37.4613V30.25H160.165V37.028C160.165 38.2041 160.32 39.0707 160.629 39.5968C160.939 40.123 161.527 40.3706 162.394 40.3706C162.641 40.3706 162.951 40.3706 163.229 40.3396C163.539 40.3087 163.786 40.2777 164.003 40.2468V30.25H167.655V42.7537Z"
                        fill="#3F82BC"
                      />
                      <path
                        d="M170.502 36.7178C170.502 35.7893 170.657 34.8918 170.967 34.0561C171.276 33.2205 171.709 32.5087 172.298 31.8897C172.886 31.2707 173.566 30.7755 174.402 30.435C175.238 30.0636 176.166 29.8779 177.219 29.8779C177.899 29.8779 178.549 29.9398 179.106 30.0636C179.695 30.1874 180.252 30.3731 180.778 30.5898L180.004 33.53C179.664 33.4062 179.292 33.2824 178.859 33.1896C178.426 33.0967 177.992 33.0348 177.466 33.0348C176.383 33.0348 175.578 33.3753 175.052 34.0561C174.526 34.737 174.247 35.6036 174.247 36.7178C174.247 37.8939 174.495 38.7914 174.99 39.4414C175.485 40.0913 176.352 40.4008 177.621 40.4008C178.054 40.4008 178.549 40.3699 179.045 40.277C179.54 40.1842 180.035 40.0604 180.437 39.8747L180.963 42.8768C180.53 43.0625 180.004 43.2173 179.354 43.3411C178.704 43.4649 177.992 43.5268 177.249 43.5268C176.073 43.5268 175.052 43.3411 174.185 43.0006C173.319 42.6602 172.638 42.165 172.081 41.546C171.524 40.927 171.121 40.2152 170.874 39.3795C170.626 38.6058 170.502 37.7082 170.502 36.7178Z"
                        fill="#3F82BC"
                      />
                      <path
                        d="M182.201 36.7178C182.201 35.7893 182.356 34.8918 182.665 34.0561C182.975 33.2205 183.408 32.5087 183.996 31.8897C184.584 31.2707 185.265 30.7755 186.101 30.435C186.936 30.0636 187.865 29.8779 188.917 29.8779C189.598 29.8779 190.248 29.9398 190.805 30.0636C191.393 30.1874 191.95 30.3731 192.476 30.5898L191.703 33.53C191.362 33.4062 190.991 33.2824 190.558 33.1896C190.155 33.0967 189.691 33.0348 189.165 33.0348C188.082 33.0348 187.277 33.3753 186.751 34.0561C186.225 34.737 185.946 35.6036 185.946 36.7178C185.946 37.8939 186.194 38.7914 186.689 39.4414C187.184 40.0913 188.051 40.4008 189.32 40.4008C189.753 40.4008 190.248 40.3699 190.743 40.277C191.238 40.1842 191.734 40.0604 192.136 39.8747L192.662 42.8768C192.229 43.0625 191.703 43.2173 191.053 43.3411C190.403 43.4649 189.691 43.5268 188.948 43.5268C187.772 43.5268 186.751 43.3411 185.884 43.0006C185.018 42.6602 184.337 42.165 183.78 41.546C183.223 40.927 182.82 40.2152 182.573 39.3795C182.325 38.6058 182.201 37.7082 182.201 36.7178Z"
                        fill="#3F82BC"
                      />
                      <path
                        d="M193.9 36.8419C193.9 35.6968 194.086 34.6755 194.427 33.8089C194.767 32.9423 195.231 32.2304 195.819 31.6424C196.407 31.0543 197.057 30.621 197.8 30.3425C198.543 30.033 199.317 29.9092 200.09 29.9092C201.916 29.9092 203.371 30.4663 204.454 31.6114C205.538 32.7256 206.064 34.3969 206.064 36.5634C206.064 36.78 206.064 36.9967 206.033 37.2752C206.002 37.5228 206.002 37.7704 205.971 37.9561H197.676C197.769 38.6989 198.11 39.3179 198.729 39.7512C199.348 40.1845 200.183 40.4012 201.235 40.4012C201.916 40.4012 202.566 40.3392 203.216 40.2154C203.866 40.0916 204.392 39.9369 204.795 39.7512L205.29 42.7224C205.104 42.8152 204.826 42.9081 204.516 43.0319C204.176 43.1247 203.835 43.2176 203.433 43.2795C203.031 43.3414 202.597 43.4033 202.133 43.4652C201.669 43.5271 201.205 43.5271 200.74 43.5271C199.564 43.5271 198.574 43.3414 197.707 43.0009C196.841 42.6605 196.129 42.1962 195.572 41.5772C195.015 40.9892 194.581 40.2773 194.303 39.4417C194.055 38.668 193.9 37.7704 193.9 36.8419ZM202.535 35.4182C202.504 35.1087 202.473 34.7992 202.381 34.5207C202.288 34.2112 202.164 33.9636 201.947 33.747C201.762 33.5303 201.514 33.3137 201.235 33.1899C200.957 33.0351 200.586 32.9732 200.152 32.9732C199.75 32.9732 199.378 33.0351 199.1 33.1899C198.79 33.3446 198.543 33.4994 198.357 33.747C198.171 33.9636 198.017 34.2421 197.893 34.5516C197.8 34.8611 197.707 35.1706 197.645 35.4801H202.535V35.4182Z"
                        fill="#3F82BC"
                      />
                      <path
                        d="M212.625 40.5871C213.306 40.5871 213.77 40.5252 214.049 40.4014C214.327 40.2776 214.482 40.03 214.482 39.6277C214.482 39.3182 214.296 39.0706 213.925 38.854C213.553 38.6373 213.027 38.3897 212.284 38.1112C211.696 37.8945 211.201 37.6779 210.706 37.4612C210.242 37.2446 209.839 36.966 209.499 36.6256C209.159 36.3161 208.911 35.9137 208.725 35.4804C208.54 35.0471 208.447 34.49 208.447 33.871C208.447 32.664 208.911 31.7046 209.809 30.9927C210.706 30.2809 211.944 29.9404 213.522 29.9404C214.296 29.9404 215.07 30.0023 215.782 30.1571C216.494 30.3118 217.082 30.4356 217.515 30.6213L216.865 33.4687C216.432 33.3139 215.968 33.1901 215.472 33.0663C214.977 32.9425 214.42 32.8807 213.77 32.8807C212.625 32.8807 212.037 33.1901 212.037 33.8401C212.037 33.9948 212.068 34.1186 212.099 34.2424C212.161 34.3662 212.254 34.4591 212.408 34.5829C212.563 34.6757 212.749 34.7995 212.996 34.9233C213.244 35.0471 213.584 35.1709 213.956 35.3257C214.76 35.6352 215.41 35.9137 215.937 36.2232C216.463 36.5018 216.865 36.8113 217.175 37.1517C217.484 37.4922 217.701 37.8636 217.824 38.2659C217.948 38.6682 218.01 39.1635 218.01 39.6896C218.01 40.9585 217.515 41.9489 216.556 42.5989C215.596 43.2488 214.234 43.5893 212.47 43.5893C211.325 43.5893 210.366 43.4964 209.592 43.2798C208.818 43.0941 208.292 42.9084 208.013 42.7846L208.632 39.8134C209.251 40.061 209.901 40.2467 210.551 40.4014C211.356 40.4943 212.006 40.5871 212.625 40.5871Z"
                        fill="#3F82BC"
                      />
                      <path
                        d="M224.572 40.5871C225.252 40.5871 225.717 40.5252 225.995 40.4014C226.274 40.2776 226.429 40.03 226.429 39.6277C226.429 39.3182 226.243 39.0706 225.871 38.854C225.5 38.6373 224.974 38.3897 224.231 38.1112C223.643 37.8945 223.148 37.6779 222.653 37.4612C222.188 37.2446 221.786 36.966 221.446 36.6256C221.105 36.3161 220.858 35.9137 220.672 35.4804C220.486 35.0471 220.393 34.49 220.393 33.871C220.393 32.664 220.858 31.7046 221.755 30.9927C222.653 30.2809 223.891 29.9404 225.469 29.9404C226.243 29.9404 227.017 30.0023 227.728 30.1571C228.44 30.3118 229.028 30.4356 229.462 30.6213L228.812 33.4687C228.378 33.3139 227.914 33.1901 227.419 33.0663C226.924 32.9425 226.367 32.8807 225.717 32.8807C224.572 32.8807 223.983 33.1901 223.983 33.8401C223.983 33.9948 224.014 34.1186 224.045 34.2424C224.107 34.3662 224.2 34.4591 224.355 34.5829C224.51 34.6757 224.695 34.7995 224.943 34.9233C225.191 35.0471 225.531 35.1709 225.902 35.3257C226.707 35.6352 227.388 35.9137 227.914 36.2232C228.44 36.5018 228.843 36.8113 229.152 37.1517C229.462 37.4922 229.678 37.8636 229.802 38.2659C229.926 38.6682 229.988 39.1635 229.988 39.6896C229.988 40.9585 229.493 41.9489 228.533 42.5989C227.574 43.2488 226.212 43.5893 224.448 43.5893C223.303 43.5893 222.343 43.4964 221.569 43.2798C220.796 43.0941 220.27 42.9084 219.991 42.7846L220.61 39.8134C221.229 40.061 221.879 40.2467 222.529 40.4014C223.303 40.4943 223.953 40.5871 224.572 40.5871Z"
                        fill="#3F82BC"
                      />
                      <path
                        d="M53.6978 26.9383V42.0418C53.6978 46.5604 48.4054 49.0364 44.939 46.1271L30.2689 33.7782C28.2881 32.1069 25.4097 32.1069 23.429 33.7782L8.75878 46.1271C5.29241 49.0364 0 46.5914 0 42.0418V26.9692C0 25.3908 0.680892 23.9052 1.88793 22.8839L3.80682 21.2745V23.1005C3.80682 25.8241 6.0352 28.0834 8.78973 28.0834C9.96582 28.0834 11.0491 27.6811 11.9776 26.9073L26.7715 14.4655L26.8644 14.4346L26.9572 14.4655L41.7512 26.9073C42.6488 27.6811 43.7629 28.0834 44.939 28.0834C47.6936 28.0834 49.9219 25.855 49.9219 23.1005V21.2435L51.8408 22.8529C53.0169 23.8742 53.6978 25.3598 53.6978 26.9383Z"
                        fill="#3F82BC"
                      />
                      <path
                        d="M47.4461 18.5203V23.07C47.4461 24.5865 46.2081 25.6078 44.8772 25.6078C44.3201 25.6078 43.7631 25.4221 43.2679 25.0198L28.4739 12.578C28.0096 12.1756 27.4216 11.9899 26.8335 11.9899C26.2455 11.9899 25.6574 12.1756 25.1932 12.578L10.4302 25.0198C9.93497 25.4531 9.37788 25.6078 8.82078 25.6078C7.52089 25.6078 6.25195 24.5865 6.25195 23.07V18.5203C6.25195 17.7775 6.5924 17.0657 7.14949 16.5705L25.1932 1.37418C25.6574 0.971829 26.2455 0.786133 26.8335 0.786133C27.4216 0.786133 28.0096 0.971829 28.4739 1.37418L46.5485 16.5396C47.1366 17.0657 47.4461 17.7775 47.4461 18.5203Z"
                        fill="#55C0C7"
                      />
                    </svg>

                    {/* <a href="#">
                      <img
                        src="images/logo.svg"
                        className="img-logo img-fluid"
                      />
                    </a> */}
                  </div>
                  <div className="col-6 text-right">
                    <div className="dropdown show">
                      <a
                        className="btn dropdown-toggle show"
                        onClick={() => {
                          setDropdown(!dropdown);
                        }}
                        role="button"
                        data-toggle="dropdown"
                      >
                        <span className="mr-2 text-gray-600">
                          {session.user.email || session.user.name}
                        </span>

                        {session.user.image && (
                          <span
                            style={{
                              backgroundImage: `url(${session.user.image})`,
                            }}
                            className={styles.avatar}
                          />
                        )}
                      </a>
                      <div
                        className={`dropdown-menu dropdown-menu-right ${
                          dropdown ? "show" : ""
                        }`}
                      >
                        <a className="dropdown-item" href="#">
                          <img src="images/switch.svg" /> Switch States
                        </a>
                        <a className="dropdown-item" href="#">
                          <img src="images/refer_earn.svg" /> Refer And Earn
                        </a>
                        <a className="dropdown-item" href="#">
                          <img src="images/profile.svg" /> Profile
                        </a>
                        <a className="dropdown-item" href="#">
                          <img src="images/billing.svg" /> Billing
                        </a>
                        <a className="dropdown-item" href="#">
                          <img src="images/setting.svg" /> Settings
                        </a>
                        <a
                          className="dropdown-item"
                          href={`/api/auth/signout`}
                          onClick={(e) => {
                            e.preventDefault();
                            signOut();
                          }}
                        >
                          Sign out
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </p>
      </div>
    </header>
  );
}