import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className="layout-container flex h-full min-h-screen flex-col group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
        <div className="px-40 flex flex-1 justify-center py-5"></div>
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-3 px-5 py-1 text-center @container">
              <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                <a className="text-[#49749c] text-base font-normal leading-normal min-w-40 foot" href="#">About Us</a>
                <a className="text-[#49749c] text-base font-normal leading-normal min-w-40 foot" href="#">Contact</a>
                <a className="text-[#49749c] text-base font-normal leading-normal min-w-40 foot" href="#">Privacy Policy</a>
                <a className="text-[#49749c] text-base font-normal leading-normal min-w-40 foot" href="#">Terms of Service</a>
              </div>
              <div className="my-2">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2"><i className="bi bi-twitter" style={{fontSize: 22}}></i></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2"><i className="bi bi-facebook" style={{fontSize: 22}}></i></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="mx-2"><i className="bi bi-linkedin" style={{fontSize: 22}}></i></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2"><i className="bi bi-instagram" style={{fontSize: 22}}></i></a>
              </div>
              <p className="text-[#49749c] text-base font-normal leading-normal">© 2024 Facility Management Co. All rights reserved.</p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Footer