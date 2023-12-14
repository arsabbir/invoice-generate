interface InvoiceData {
  invoiceNumber: string;
  client: {
    name: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    item: string;
    quantity: number;
    rate: number;
    amount: number;
  }[];
  totalAmount: number;
  amountPaid: number;
  dueBalance: number;
  paymentStatus: string;
  billBy: {
    name: string;
    email: string;
    city: string;
    state: string;
  };
  dueDate: string;
  invoiceDate: string;
}
interface InvoicePrintProps {
  data: InvoiceData;
  refP: React.RefObject<HTMLDivElement>;
}
const InvoicePrint: React.FC<InvoicePrintProps> = ({ data, refP }) => {
  console.log(data, "print");

  return (
    <div ref={refP} className="bg-[#f5f5f5] light:bg-slate-900">
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
                  {data?.billBy?.name}

                  <br />
                  {data?.billBy?.email}
                  <br />
                  {data?.billBy?.city}
                  <br />
                  {data?.billBy?.state}
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
                  {data?.client.name}
                </h3>
                <div className="mt-2 not-italic text-gray-500">
                  {data?.client.email}
                  <br />
                  {data?.client.street}
                  <br />
                  {data?.client.city}
                  <br />
                  {data?.client.state}
                  <br />
                  {data?.client.zipCode}
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
                    <dd className="col-span-2 text-gray-500">
                      {data?.invoiceDate}
                    </dd>
                  </dl>
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 light:text-gray-200">
                      Due date:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      {data?.dueDate}
                    </dd>
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
                    Quantity
                  </div>
                  <div className="text-start text-xs font-medium text-gray-500 uppercase">
                    Rate
                  </div>
                  <div className="text-end text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </div>
                </div>
                {data &&
                  data?.items.map((item, index) => (
                    <div key={index}>
                      <div className="hidden sm:block border-b border-gray-200 light:border-gray-700" />
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        <div className="col-span-full sm:col-span-2">
                          <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                            Item
                          </h5>
                          <p className="font-medium text-gray-800 light:text-gray-200">
                            {item.item}{" "}
                            {/* Replace with your actual property name */}
                          </p>
                        </div>
                        <div>
                          <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                            Qty
                          </h5>
                          <p className="text-gray-800 light:text-gray-200">
                            {item.quantity}
                          </p>
                        </div>
                        <div>
                          <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                            Rate
                          </h5>
                          <p className="text-gray-800 light:text-gray-200">
                            {item.rate}
                          </p>
                        </div>
                        <div>
                          <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                            Amount
                          </h5>
                          <p className="sm:text-end text-gray-800 light:text-gray-200">
                            ${item.amount}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
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
                      Total:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      {" "}
                      {data?.totalAmount}
                    </dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 light:text-gray-200">
                      Amount paid:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      {data?.amountPaid}
                    </dd>
                  </dl>
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 light:text-gray-200">
                      Due balance:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      {data?.dueBalance}
                    </dd>
                  </dl>
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 light:text-gray-200">
                      Payment Status:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      {data?.paymentStatus}
                    </dd>
                  </dl>
                </div>
                {/* End Grid */}
              </div>
            </div>
            {/* End Flex */}
            <div className="mt-8 sm:mt-12">
              <p className="text-gray-500 rounded p-5 bg-blue-200">
                <span className="uppercase font-bold mr-2">Notes:</span>
                All accounts are to be paid within 7 days from receipt of
                invoice. To be paid by cheque or credit card or direct payment
                online. If account is not paid within 7 days the credits details
                supplied as confirmation of work undertaken will be charged the
                agreed quoted fee noted above.
              </p>
            </div>
            <p className="mt-5 text-sm text-gray-500">© 2022 Preline.</p>
          </div>
          {/* End Card */}
        </div>
      </div>
      {/* End Invoice */}
    </div>
  );
};

export default InvoicePrint;
