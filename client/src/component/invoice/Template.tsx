import React from "react";

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface InvoiceProps {
  companyName: string;
  address: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
}

const Template: React.FC<InvoiceProps> = ({
  companyName,
  address,
  invoiceNumber,
  issueDate,
  dueDate,
  items,
}) => {
  return (
    <>
      <div className="justify-center flex p-10  ">
        <div className=" bg-[#ffffff] max-w-[900px] rounded mt-5 w-full overflow-hidden shadow-lg">
          <div className="p-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col-span-2 ">
              <h3 className="font-bold text-2xl text-[#495057] mb-6">
                Invoice: Lezeco-00335
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className=" mb-2">
                  <p className="font-medium text-sm text-[#4b4b5e] mb-1">
                    INVOICE NO
                  </p>
                  <h5 className="text-[#495057] font-medium text-xs">
                    #VL25000355
                  </h5>
                </div>
                <div className=" mb-2">
                  <p className="font-medium text-sm text-[#4b4b5e] mb-1">
                    INVOICE NO
                  </p>
                  <h5 className="text-[#495057] font-medium text-xs">
                    #VL25000355
                  </h5>
                </div>
                <div className=" mb-2">
                  <p className="font-medium text-sm text-[#4b4b5e] mb-1 uppercase">
                    Payment Status
                  </p>
                  <p className=" inline-block bg-green-300 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                    Paid
                  </p>
                </div>
                <div className=" mb-2">
                  <p className="font-medium text-sm text-[#4b4b5e] mb-1">
                    INVOICE NO
                  </p>
                  <h5 className="text-[#495057] font-medium text-xs">
                    #VL25000355
                  </h5>
                </div>
              </div>
            </div>
            <div className="p-5 w-216" style={{ overflowX: "visible" }}>
              <h3 className="font-bold text-2xl mb-3">Invoice</h3>
              <h6 className="font-semibold text-base mb-2 text-[#232424] uppercase">
                Address
              </h6>
              <p className="text-base text-[#495057] mb-2">
                California, United States
              </p>
              <p className="text-base text-[#495057] mb-2">
                <span>Zip-code:</span> 6321
              </p>
              <h6 className="mb-2">
                <span className="text-base text-[#495057]">Email:</span>
                <span className="text-gray-900">
                  contact.arsabbir@gmail.com
                </span>
              </h6>
              <h6 className="mb-2">
                <span className="text-base text-[#495057]">Contact:</span>
                <span className="text-gray-900">01786917499</span>
              </h6>
            </div>
          </div>

          <div className="p4"></div>
          <div className="p4"></div>
        </div>
      </div>
    </>
  );
};

export default Template;
