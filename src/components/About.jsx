import React from "react";

const About = () => (
  <div>
    <div class="px-40 flex flex-1 justify-center py-5">
      <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div class="flex flex-wrap justify-between gap-3 p-4">
          <p class="text-[#0d151b] tracking-light text-[32px] font-bold leading-tight min-w-72">
            About FACLPRO
          </p>
        </div>
        <h2 class="text-[#0d151b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Our Mission
        </h2>
        <p class="text-[#0d151b] text-base font-normal leading-normal pb-3 pt-1 px-4">
          At FACLPRO, our mission is to revolutionize facility management
          by providing innovative, efficient, and user-friendly solutions. We
          strive to empower businesses to optimize their operations, reduce
          costs, and enhance the overall experience for their employees and
          clients. Our commitment is to deliver exceptional service and support,
          ensuring our clients' facilities are always in top condition.
        </p>
        <h2 class="text-[#0d151b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Our Values
        </h2>
        <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          <div class="flex flex-1 gap-3 rounded-lg border border-[#cfdce7] bg-slate-50 p-4 flex-col">
            <div
              class="text-[#0d151b]"
              data-icon="ShieldCheck"
              data-size="24px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M208,40H48A16,16,0,0,0,32,56v58.78c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40Zm0,74.79c0,78.42-66.35,104.62-80,109.18-13.53-4.51-80-30.69-80-109.18V56H208ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.68l50.34-50.34a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z"></path>
              </svg>
            </div>
            <div class="flex flex-col gap-1">
              <h2 class="text-[#0d151b] text-base font-bold leading-tight">
                Integrity
              </h2>
              <p class="text-[#4c749a] text-sm font-normal leading-normal">
                We uphold the highest standards of honesty and transparency in
                all our interactions.
              </p>
            </div>
          </div>
          <div class="flex flex-1 gap-3 rounded-lg border border-[#cfdce7] bg-slate-50 p-4 flex-col">
            <div
              class="text-[#0d151b]"
              data-icon="Users"
              data-size="24px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
              </svg>
            </div>
            <div class="flex flex-col gap-1">
              <h2 class="text-[#0d151b] text-base font-bold leading-tight">
                Collaboration
              </h2>
              <p class="text-[#4c749a] text-sm font-normal leading-normal">
                We believe in the power of teamwork and open communication to
                achieve shared goals.
              </p>
            </div>
          </div>
          <div class="flex flex-1 gap-3 rounded-lg border border-[#cfdce7] bg-slate-50 p-4 flex-col">
            <div
              class="text-[#0d151b]"
              data-icon="Clock"
              data-size="24px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
              </svg>
            </div>
            <div class="flex flex-col gap-1">
              <h2 class="text-[#0d151b] text-base font-bold leading-tight">
                Efficiency
              </h2>
              <p class="text-[#4c749a] text-sm font-normal leading-normal">
                We are dedicated to streamlining processes and maximizing
                productivity for our clients.
              </p>
            </div>
          </div>
        </div>
        <h2 class="text-[#0d151b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Meet Our Team
        </h2>
        <div class="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden">
          <div class="flex items-stretch p-4 gap-8">
            <div class="flex h-full flex-1 flex-col gap-4 text-center rounded-lg min-w-32 pt-4">
              <div
                class="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center w-full"
                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCiDWwCRJZsoAyoSxOvpHKfjKhIKVCQdYI9E6SuVUtv5SpZiFwP8DfsDmDZSxbAT6CzDladRTBaRuiL8CN9wgnn1vEfrt7YRdhkF5L6K1oau0nNvhMtd10J8lqMvCH6OUmstkN3_SMNWm72XFMsMXvhxyN7jdiMPnugcQrWJPQ63KTLRCOPElrgfgDpNAKERfaQFTVbSXjlwI6S8eC9KJcvpNexr00-mOzpCBZJ2Aii__YesdX5WT-_OOlOcHoXlq4peGd9wZc5slY");'
              ></div>
              <div>
                <p class="text-[#0d151b] text-base font-medium leading-normal">
                  Sarah Chen
                </p>
                <p class="text-[#4c749a] text-sm font-normal leading-normal">
                  CEO
                </p>
              </div>
            </div>
            <div class="flex h-full flex-1 flex-col gap-4 text-center rounded-lg min-w-32 pt-4">
              <div
                class="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center w-full"
                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAVOHMxx03sul144zC40O9KQNeFsjSW1Drz0XFqpHevyv1CVOIlqzwcnbRxkJBTUpYkzUAPrH1pWqf62Ql4aJpmt_D9kmP_elHb2yFXNDouwX-ecz4rsM2IYeF0ZI4EnK6DYDLoRbHgIHAU57Xk-OxtIDUCm3Ly-0-BAcpEisJkTxi1_P4sG7fWmhYPkzTKZaxqnRc3S2ZmF4mi1MDkjDemjghq1cJ4UG6QhSmOZoWhqhxY-aPsnMm0UGtQKfGTgWlu2fciwAsHqTU");'
              ></div>
              <div>
                <p class="text-[#0d151b] text-base font-medium leading-normal">
                  David Lee
                </p>
                <p class="text-[#4c749a] text-sm font-normal leading-normal">
                  Head of Operations
                </p>
              </div>
            </div>
            <div class="flex h-full flex-1 flex-col gap-4 text-center rounded-lg min-w-32 pt-4">
              <div
                class="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center w-full"
                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWdfqSgm9_3yl_DmjunaDwx8YnLor9yeL6jByfXxWcqNUnAGUHK_GSUfRnaocg2iPGf3SLwq3XSTeERaKHPfoi237mC5iurdfs5e0Y0zhL3wgGSsvxbsNJxn4XhZCxlTw6ueBlgZ01HidD3IPZRkFBJnFHV6aSoTcsLs2ogVQQPe4Mdyd0zchmx1o0BF4aojbC_zAquM7h1fG9CWcLSeRzPzxCnAR9EWQqZDSm8quIdFrC_HvJ2gjRb3ZMQLQc-CpQ5wgsDs0Te0o");'
              ></div>
              <div>
                <p class="text-[#0d151b] text-base font-medium leading-normal">
                  Emily Rodriguez
                </p>
                <p class="text-[#4c749a] text-sm font-normal leading-normal">
                  Customer Success Manager
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;
