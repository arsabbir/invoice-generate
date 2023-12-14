import React from "react";

const InvoiceTemplate = () => {
  return (
    <div className="bg-[#f5f5f5] light:bg-slate-900">
      {/* Invoice */}
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
        <div className="sm:w-11/12 lg:w-3/4 mx-auto">
          {/* Card */}
          <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl light:bg-gray-800">
            {/* Grid */}
            <div className="flex justify-between">
              <div>
                <svg
                  className="w-10 h-10"
                  width={26}
                  height={26}
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 26V13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13C25 19.6274 19.6274 25 13 25H12"
                    className="stroke-blue-600 light:stroke-white"
                    stroke="currentColor"
                    strokeWidth={2}
                  />
                  <path
                    d="M5 26V13.16C5 8.65336 8.58172 5 13 5C17.4183 5 21 8.65336 21 13.16C21 17.6666 17.4183 21.32 13 21.32H12"
                    className="stroke-blue-600 light:stroke-white"
                    stroke="currentColor"
                    strokeWidth={2}
                  />
                  <circle
                    cx={13}
                    cy="13.0214"
                    r={5}
                    fill="currentColor"
                    className="fill-blue-600 light:fill-white"
                  />
                </svg>
                <h1 className="mt-2 text-lg md:text-xl font-semibold text-blue-600 light:text-white">
                  Preline Inc.
                </h1>
              </div>
              {/* Col */}
              <div className="text-end">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 light:text-gray-200">
                  Invoice #
                </h2>
                <span className="mt-1 block text-gray-500">3682303</span>
                <address className="mt-4 not-italic text-gray-800 light:text-gray-200">
                  AR Sabbir
                  <br />
                  contack.arsabbir@gmail.com
                  <br />
                  Rajshahi
                  <br />
                  Dhaka
                  <br />
                </address>
              </div>
              {/* Col */}
            </div>
            {/* End Grid */}
            {/* Grid */}
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 light:text-gray-200">
                  Bill to:
                </h3>
                <h3 className="text-lg font-semibold text-gray-800 light:text-gray-200">
                  Sara Williams
                </h3>
                <div className="mt-2 not-italic text-gray-500">
                  youremail@gmail.com
                  <br />
                  your adress
                  <br />
                  Your City
                  <br />
                  Your State
                   <br />
                   Your Zip Code
                </div>
              </div>
              {/* Col */}
              <div className="sm:text-end space-y-2">
                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 light:text-gray-200">
                      Invoice date:
                    </dt>
                    <dd className="col-span-2 text-gray-500">03/10/2018</dd>
                  </dl>
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 light:text-gray-200">
                      Due date:
                    </dt>
                    <dd className="col-span-2 text-gray-500">03/11/2018</dd>
                  </dl>
                </div>
                {/* End Grid */}
              </div>
              {/* Col */}
            </div>
            {/* End Grid */}
            {/* Table */}
            <div className="mt-6">
              <div className="border border-gray-200 p-4 rounded-lg space-y-4 light:border-gray-700">
                <div className="hidden sm:grid sm:grid-cols-5">
                  <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                    Item
                  </div>
                  <div className="text-start text-xs font-medium text-gray-500 uppercase">
                    Qty
                  </div>
                  <div className="text-start text-xs font-medium text-gray-500 uppercase">
                    Rate
                  </div>
                  <div className="text-end text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </div>
                </div>
                <div className="hidden sm:block border-b border-gray-200 light:border-gray-700" />
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  <div className="col-span-full sm:col-span-2">
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Item
                    </h5>
                    <p className="font-medium text-gray-800 light:text-gray-200">
                      Design UX and UI
                    </p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Qty
                    </h5>
                    <p className="text-gray-800 light:text-gray-200">1</p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Rate
                    </h5>
                    <p className="text-gray-800 light:text-gray-200">5</p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </h5>
                    <p className="sm:text-end text-gray-800 light:text-gray-200">
                      $500
                    </p>
                  </div>
                </div>
                <div className="sm:hidden border-b border-gray-200 light:border-gray-700" />
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  <div className="col-span-full sm:col-span-2">
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Item
                    </h5>
                    <p className="font-medium text-gray-800 light:text-gray-200">
                      Web project
                    </p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Qty
                    </h5>
                    <p className="text-gray-800 light:text-gray-200">1</p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Rate
                    </h5>
                    <p className="text-gray-800 light:text-gray-200">24</p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </h5>
                    <p className="sm:text-end text-gray-800 light:text-gray-200">
                      $1250
                    </p>
                  </div>
                </div>
                <div className="sm:hidden border-b border-gray-200 light:border-gray-700" />
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  <div className="col-span-full sm:col-span-2">
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Item
                    </h5>
                    <p className="font-medium text-gray-800 light:text-gray-200">
                      SEO
                    </p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Qty
                    </h5>
                    <p className="text-gray-800 light:text-gray-200">1</p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Rate
                    </h5>
                    <p className="text-gray-800 light:text-gray-200">6</p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </h5>
                    <p className="sm:text-end text-gray-800 light:text-gray-200">
                      $2000
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* End Table */}
            {/* Flex */}
            <div className="mt-8 flex sm:justify-end">
              <div className="w-full max-w-2xl sm:text-end space-y-2">
                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 light:text-gray-200">
                      Subtotal:
                    </dt>
                    <dd className="col-span-2 text-gray-500">$2750.00</dd>
                  </dl>
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 light:text-gray-200">
                      Total:
                    </dt>
                    <dd className="col-span-2 text-gray-500">$2750.00</dd>
                  </dl>
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 light:text-gray-200">
                      Tax:
                    </dt>
                    <dd className="col-span-2 text-gray-500">$39.00</dd>
                  </dl>
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 light:text-gray-200">
                      Amount paid:
                    </dt>
                    <dd className="col-span-2 text-gray-500">$2789.00</dd>
                  </dl>
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 light:text-gray-200">
                      Due balance:
                    </dt>
                    <dd className="col-span-2 text-gray-500">$0.00</dd>
                  </dl>
                </div>
                {/* End Grid */}
              </div>
            </div>
            {/* End Flex */}
            <div className="mt-8 sm:mt-12">
              <h4 className="text-lg font-semibold text-gray-800 light:text-gray-200">
                Thank you!
              </h4>
              <p className="text-gray-500">
                If you have any questions concerning this invoice, use the
                following contact information:
              </p>
              <div className="mt-2">
                <p className="block text-sm font-medium text-gray-800 light:text-gray-200">
                  example@site.com
                </p>
                <p className="block text-sm font-medium text-gray-800 light:text-gray-200">
                  +1 (062) 109-9222
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm text-gray-500">© 2022 Preline.</p>
          </div>
          {/* End Card */}
          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-x-3">
            <a
              className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm light:bg-gray-800 light:hover:bg-slate-800 light:border-gray-700 light:text-gray-400 light:hover:text-white light:focus:ring-offset-gray-800"
              href="#"
            >
              <svg
                className="flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1={12} x2={12} y1={15} y2={3} />
              </svg>
              Invoice PDF
            </a>
            <a
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none light:focus:outline-none light:focus:ring-1 light:focus:ring-gray-600"
              href="#"
            >
              <svg
                className="flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect width={12} height={8} x={6} y={14} />
              </svg>
              Print
            </a>
          </div>
          {/* End Buttons */}
        </div>
      </div>
      {/* End Invoice */}
    </div>
  );
};

export default InvoiceTemplate;
