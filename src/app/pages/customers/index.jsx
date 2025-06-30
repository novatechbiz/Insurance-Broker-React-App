import { useState } from "react";
import { Page } from "components/shared/Page";
import { Table, THead, TBody, Th, Tr, Td } from "components/ui/Table";
import {
  Pagination,
  PaginationNext,
  PaginationPrevious,
  PaginationItems,
} from "components/ui/Pagination";
import { Button } from "components/ui/Button";
import { Search } from "components/template/Search";

import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

export default function Customers() {
 const [customers, setCustomers] = useState([
  { id: 1, name: "Customer #1", idNo: "1978123456789", contact: "070 582 3946" },
  { id: 2, name: "Customer #2", idNo: "1978853201947", contact: "071 934 2750" },
  { id: 3, name: "Customer #3", idNo: "1978604378963", contact: "072 846 1093" },
  { id: 4, name: "Customer #4", idNo: "1978604678968", contact: "072 234 1093" },
  { id: 5, name: "Customer #5", idNo: "1978604789078", contact: "072 567 1093" },
  { id: 6, name: "Customer #6", idNo: "1978999999999", contact: "070 000 0000" },
  { id: 7, name: "Customer #7", idNo: "1978604789078", contact: "072 567 1093" },
  { id: 8, name: "Customer #8", idNo: "1978999999999", contact: "070 000 0000" },
  { id: 9, name: "Customer #9", idNo: "1978853201947", contact: "071 934 2750" },
  { id: 10, name: "Customer #10", idNo: "1978604378963", contact: "072 846 1093" },
  { id: 11, name: "Customer #11", idNo: "1978604678968", contact: "072 234 1093" },
  { id: 12, name: "Customer #12", idNo: "1978604789078", contact: "072 567 1093" },
  { id: 13, name: "Customer #13", idNo: "1978604678968", contact: "072 234 1093" },
  { id: 14, name: "Customer #14", idNo: "1978604789078", contact: "072 567 1093" },
  { id: 15, name: "Customer #15", idNo: "1978123456789", contact: "070 582 3946" },
  { id: 16, name: "Customer #16", idNo: "1978853201947", contact: "071 934 2750" },
  { id: 17, name: "Customer #17", idNo: "1978604378963", contact: "072 846 1093" },
  { id: 18, name: "Customer #18", idNo: "1978604678968", contact: "072 234 1093" },
  { id: 19, name: "Customer #19", idNo: "1978604789078", contact: "072 567 1093" },
  { id: 20, name: "Customer #20", idNo: "1978604678968", contact: "072 234 1093" },
]);


  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [idSearch, setIdSearch] = useState("");
  const [pageSize, setPageSize] = useState(6);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleSearch = () => {
    setIdSearch(searchInput.trim());
    setCurrentPage(1);
  };
  const handleUpdate = (updatedData) => {
    setCustomers(prev => prev.map(c => (c.id === updatedData.id ? updatedData : c)));
    setShowEditModal(false);
  };

  const filteredCustomers = customers.filter((c) =>
    c.idNo.toLowerCase().includes(idSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / pageSize);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const startIndex = filteredCustomers.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, filteredCustomers.length);

  return (
    <Page title="customers">
      <div className={`p-4 my-4 transition-content w-full pt-5 lg:pt-6 ${showModal ? "blur-sm" : ""}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Registered Customer Details
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your customer database efficiently
            </p>
          </div>
          <Button type="button" className="mt-0 px-4 py-2" color="primary">
            + Create Customer
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <select className="w-[300px] px-2 py-2 border rounded text-sm dark:bg-gray-800 dark:text-gray-200">
            <option>Customer Type</option>
            <option>Type 1</option>
            <option>Type 2</option>
          </select>

          <div className="relative w-[280px]">
            <input
              type="text"
              placeholder="Enter ID Number"
              
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border rounded text-sm dark:bg-gray-800 dark:text-white"
            />
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300">
              <Search className="w-4 h-4" />
            </div>
          </div>

          <select className="w-[180px] px-2 py-2 border rounded text-sm dark:bg-gray-800 dark:text-gray-200">
            <option>NIC</option>
            <option>Passport</option>
          </select>

          <Button
            onClick={handleSearch}
            type="button"
            className="mt-0 px-6 py-2 flex items-center gap-2"
            color="primary"
          >
            <MagnifyingGlassIcon className="w-4 h-4" /> Search
          </Button>
        </div>

       
        {/* ======================================================Table================================================= */}
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
          <Table className="min-w-full text-sm">
            <THead>
              <Tr className="bg-blue-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-left">
                <Th>Customer Name</Th>
                <Th>Identification No</Th>
                <Th>Contact Number</Th>
                <Th>Action</Th>
              </Tr>
            </THead>
            <TBody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedCustomers.length === 0 ? (
                <Tr>
                  <Td colSpan="4" className="text-center text-gray-500 py-6">
                    No matching customers found.
                  </Td>
                </Tr>
              ) : (
                paginatedCustomers.map((c) => (
                  <Tr key={c.id}>
                    <Td className="text-blue-700 dark:text-blue-400">{c.name}</Td>
                    <Td>{c.idNo}</Td>
                    <Td>{c.contact}</Td>
                    <Td className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedCustomer(c);
                          setShowModal(true);
                        }}
                        className="flex items-center gap-1 bg-blue-100 hover:bg-blue-300 text-blue-700 text-xs font-semibold px-3 py-1 rounded dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white"
                      >
                        <EyeIcon className="w-4 h-4 inline" /> View
                      </button>
                      <button
                      onClick={() => {
                        setSelectedCustomer(c);
                        setShowEditModal(true);
                      }} className="flex items-center gap-1 bg-blue-100 hover:bg-blue-300 text-blue-700 text-xs font-semibold px-3 py-1 rounded dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white">
                        <PencilSquareIcon className="w-4 h-4" /> Edit
                      </button>
                      <button className="flex items-center gap-1 bg-red-100 hover:bg-red-300 text-red-600 text-xs font-semibold px-3 py-1 rounded dark:bg-red-800 dark:hover:bg-red-700 dark:text-white">
                        <TrashIcon className="w-4 h-4" /> Delete
                      </button>
                    </Td>
                  </Tr>
                ))
              )}
            </TBody>
          </Table>
        </div>

       {/* ======================================================Pagination================================================= */}

        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-black dark:text-gray-400">
            <label>Show</label>
            <select
              className="border rounded px-2 py-1 text-sm bg-blue-200 dark:text-blue-300"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {[6, 8, 10, 15, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>

          {filteredCustomers.length > pageSize && (
            <Pagination total={totalPages} value={currentPage} onChange={setCurrentPage}>
              <PaginationPrevious />
              <PaginationItems />
              <PaginationNext />
            </Pagination>
          )}

          <div className="text-sm text-black dark:text-gray-400">
            {startIndex} – {endIndex} of {filteredCustomers.length} entries
          </div>
        </div>
      </div>

      {showModal && (
        <CustomerDetailsModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          data={selectedCustomer}
        />
      )}
      
          {showEditModal && selectedCustomer && (
        <EditCustomerModal
          data={selectedCustomer}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </Page>
  );
}

{/* ======================================================View Model================================================= */}

function CustomerDetailsModal({ isOpen, onClose, data }) {
  const [showAllCorrespondence, setShowAllCorrespondence] = useState(false);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/5 dark:bg-black/30">
      <div className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center gap-2 bg-blue-200 dark:bg-gray-800 px-6 py-4 border-b border-gray-300 dark:border-gray-700 z-10">
          <EyeIcon className="w-6 h-6 text-blue-800 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-blue-800 dark:text-white">View</h2>
        </div>

        <ModalSection title="Basic Details">
          <ModalRow
            label1="Customer Name with Initial"
            value1="xxxxxxxxxxxxxx"
            label2="Customer Name"
            value2={data?.name || "-"}
          />
          <ModalRow label1="Identification Type" value1="xxxxxxxxxxxxxx" label2="Customer Type" value2="xxxxxxxxxxxxxx" />
          <ModalRow label1="Identification No" value1={data?.idNo || "-"} />
        </ModalSection>

        <ModalSection title="Correspondence Details">
          <PersonSubsection title="Person 1">
            <ModalRow label1="Contact Person Name" value1="xxxxxxxxxxxxxx" label2="Designation" value2="xxxxxxxxxxxxxx" />
            <ModalRow label1="Customer Number" value1="xxxxxxxxxxxxxx" label2="Address" value2="xxxxxxxxxxxxxx" />
            <ModalRow label1="Email" value1="xxxxxxxxxxxxxx" />
          </PersonSubsection>

          {!showAllCorrespondence && (
            <div
              className="text-right pr-6 text-sm text-blue-600 hover:underline cursor-pointer"
              onClick={() => setShowAllCorrespondence(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setShowAllCorrespondence(true);
              }}
            >
              View More
            </div>
          )}

          {showAllCorrespondence && (
            <>
              <PersonSubsection title="Person 2">
                <ModalRow label1="Contact Person Name" value1="xxxxxxxxxxxxxx" label2="Designation" value2="xxxxxxxxxxxxxx" />
                <ModalRow label1="Customer Number" value1="xxxxxxxxxxxxxx" label2="Address" value2="xxxxxxxxxxxxxx" />
                <ModalRow label1="Email" value1="xxxxxxxxxxxxxx" />
              </PersonSubsection>

              <PersonSubsection title="Person 3">
                <ModalRow label1="Contact Person Name" value1="xxxxxxxxxxxxxx" label2="Designation" value2="xxxxxxxxxxxxxx" />
                <ModalRow label1="Customer Number" value1="xxxxxxxxxxxxxx" label2="Address" value2="xxxxxxxxxxxxxx" />
                <ModalRow label1="Email" value1="xxxxxxxxxxxxxx" />
              </PersonSubsection>

              <div
                className="text-right pr-6 mt-2 text-sm text-blue-600 hover:underline cursor-pointer"
                onClick={() => setShowAllCorrespondence(false)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setShowAllCorrespondence(false);
                }}
              >
                Show Less
              </div>
            </>
          )}
        </ModalSection>

        <ModalSection title="Other Information">
          <ModalRow label1="General contact Number" value1={data?.contact || "-"} label2="Gender" value2="xxxxxxxxxxxxxx" />
          <ModalRow label1="Date Of Birth" value1="xxxxxxxxxxxxxx" label2="WhatsApp No." value2="xxxxxxxxxxxxxx" />
          <ModalRow label1="VAT Reg No." value1="xxxxxxxxxxxxxx" label2="Country" value2="xxxxxxxxxxxxxx" />
          <ModalRow label1="District" value1="xxxxxxxxxxxxxx" />
        </ModalSection>

        <div className="sticky bottom-0 bg-white dark:bg-gray-900 flex justify-end p-4 border-t border-gray-300 dark:border-gray-700 z-10">
          <button
            className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 font-semibold px-6 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalSection({ title, children }) {
  return (
    <div>
      <div className="bg-gray-200 dark:bg-gray-800 px-6 py-2 font-semibold text-gray-700 dark:text-gray-300 border-t border-gray-300 dark:border-gray-700">
        {title}
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">{children}</div>
    </div>
  );
}

function ModalRow({ label1, value1, label2, value2 }) {
  return (
    <div className="grid grid-cols-2 gap-6 px-6 py-3 text-sm text-gray-800 dark:text-gray-200">
      <div className="flex justify-between">
        <span className="font-medium">{label1}</span>
        <span>{value1}</span>
      </div>
      {label2 && (
        <div className="flex justify-between">
          <span className="font-medium">{label2}</span>
          <span>{value2}</span>
        </div>
      )}
    </div>
  );
}

function PersonSubsection({ title, children }) {
  return (
    <div className="my-4 dark:bg-gray-800">
      <h4 className="bg-gray-200 dark:bg-gray-800 px-6 py-2 font-semibold text-gray-700 dark:text-gray-300 border-t border-gray-300 dark:border-gray-700">
        {title}
      </h4>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">{children}</div>
    </div>
  );
}


{/* ======================================================Edit Model================================================= */}

function EditCustomerModal({ data, onClose, onUpdate }) {
  const [formData, setFormData] = useState({ ...data });
  const [showAllCorrespondence, setShowAllCorrespondence] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = () => {
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/5 dark:bg-black/30">
      <div className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center gap-2 bg-blue-200 dark:bg-gray-800 px-6 py-4 border-b border-gray-300 dark:border-gray-700 z-10">
          <PencilSquareIcon  className="w-6 h-6 text-blue-800 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-blue-800 dark:text-white">Edit</h2>
        </div>
    

      
        <ModalSection title="Basic Details">
          <ModalRow
            label1="Customer Name with Initial"
            value1={
              <input name="nameWithInitial"  value={formData.nameWithInitial || ""} onChange={handleChange}
                className=" dark:bg-gray-800 dark:text-white" type="text" />
            }

            label2="Customer Name"
            value2={
              <input name="name" value={formData.name || ""}  onChange={handleChange}
                className=" dark:bg-gray-800 dark:text-white" type="text"/>
            }
          />
          <ModalRow
            label1="Identification Type"
            value1={
              <input name="identificationType" value={formData.identificationType || ""} onChange={handleChange}
                className=" dark:bg-gray-800 dark:text-white"/>
            }
            label2="Customer Type"
            value2={
              <input name="customerType" value={formData.customerType || ""} onChange={handleChange}
                className=" dark:bg-gray-800 dark:text-white"/>
             }
          />
          <ModalRow
            label1="Identification No"
            value1={
              <input name="idNo" value={formData.idNo || ""} onChange={handleChange} type="text"/>
            }
          />
        </ModalSection>

        
        <ModalSection title="Correspondence Details">
          <PersonSubsection title="Person 1">
            <ModalRow
              label1="Contact Person Name"
              value1={
                <input name="person1ContactName" value={formData.person1ContactName || ""} onChange={handleChange}
                  className=" dark:bg-gray-800 dark:text-white"
                  type="text"
                />
              }
              label2="Designation"
              value2={
                <input name="person1Designation" value={formData.person1Designation || ""} onChange={handleChange}
                  className=" dark:bg-gray-800 dark:text-white"  type="text" />
              }
            />
            <ModalRow
              label1="Customer Number"
              value1={
                <input name="person1CustomerNumber" value={formData.person1CustomerNumber || ""} onChange={handleChange}
                  className=" dark:bg-gray-800 dark:text-white"  type="text"/>
              }
              label2="Address"
              value2={
                <input name="person1Address" value={formData.person1Address || ""} onChange={handleChange}
                  className=" dark:bg-gray-800 dark:text-white" type="text" />
              }
            />
            <ModalRow
              label1="Email"
              value1={
                <input name="person1Email" value={formData.person1Email || ""} onChange={handleChange}
                  className=" dark:bg-gray-800 dark:text-white" type="email"/>
              }
            />
          </PersonSubsection>

          {!showAllCorrespondence && (
            <div
              className="text-right pr-6 text-sm text-blue-600 hover:underline cursor-pointer"
              onClick={() => setShowAllCorrespondence(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setShowAllCorrespondence(true);
              }}
            >
              View More
            </div>
          )}

          {showAllCorrespondence && (
            <>
              <PersonSubsection title="Person 2">
                <ModalRow
                  label1="Contact Person Name"
                  value1={
                    <input name="person2ContactName" value={formData.person2ContactName || ""}  onChange={handleChange}
                      className=" dark:bg-gray-800 dark:text-white" type="text" />
                  }
                  label2="Designation"
                  value2={
                    <input name="person2Designation" value={formData.person2Designation || ""} onChange={handleChange}
                      className=" dark:bg-gray-800 dark:text-white" type="text"/>
                  }
                />
                <ModalRow
                  label1="Customer Number"
                  value1={
                    <input  name="person2CustomerNumber" value={formData.person2CustomerNumber || ""} onChange={handleChange}
                      className=" dark:bg-gray-800 dark:text-white" type="text"
                    />
                  }
                  label2="Address"
                  value2={
                    <input name="person2Address" value={formData.person2Address || ""} onChange={handleChange}
                      className=" dark:bg-gray-800 dark:text-white" type="text"/>
                  }
                />
                <ModalRow
                  label1="Email"
                  value1={
                    <input name="person2Email" value={formData.person2Email || ""} onChange={handleChange}
                      className=" dark:bg-gray-800 dark:text-white" type="email"/>
                  }
                />
              </PersonSubsection>

              <PersonSubsection title="Person 3">
                <ModalRow
                  label1="Contact Person Name"
                  value1={
                    <input name="person3ContactName" value={formData.person3ContactName || ""} onChange={handleChange}
                      className=" dark:bg-gray-800 dark:text-white" type="text"
                    />
                  }
                  label2="Designation"
                  value2={
                    <input name="person3Designation" value={formData.person3Designation || ""} onChange={handleChange}
                      className=" dark:bg-gray-800 dark:text-white" type="text"/>
                  }
                />
                <ModalRow
                  label1="Customer Number"
                  value1={
                    <input name="person3CustomerNumber" value={formData.person3CustomerNumber || ""} onChange={handleChange}
                      className=" dark:bg-gray-800 dark:text-white" type="text"/>
                  }
                  label2="Address"
                  value2={
                    <input name="person3Address" value={formData.person3Address || ""} onChange={handleChange}
                      className=" dark:bg-gray-800 dark:text-white" type="text"/>
                  }
                />
                <ModalRow
                  label1="Email"
                  value1={
                    <input name="person3Email" value={formData.person3Email || ""}  onChange={handleChange}
                      className=" dark:bg-gray-800 dark:text-white" type="email"/>
                  }
                />
              </PersonSubsection>

              <div
                className="text-right pr-6 mt-2 text-sm text-blue-600 hover:underline cursor-pointer"
                onClick={() => setShowAllCorrespondence(false)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setShowAllCorrespondence(false);
                }}
              >
                Show Less
              </div>
            </>
          )}
        </ModalSection>

       
        <ModalSection title="Other Information">
          <ModalRow
            label1="General Contact Number"
            value1={
              <input name="contact" value={formData.contact || ""} onChange={handleChange}
                className=" dark:bg-gray-800 dark:text-white"  type="text"/>
            }
            label2="Gender"
            value2={
              <input name="gender" value={formData.gender || ""} onChange={handleChange}
                className=" dark:bg-gray-800 dark:text-white" type="text"/>
            }
          />
          <ModalRow
            label1="Date Of Birth"
            value1={
              <input name="dob" value={formData.dob || ""} onChange={handleChange}
                className=" dark:bg-gray-800 dark:text-white" type="text"/>
            }
            label2="WhatsApp No."
            value2={
              <input name="whatsappNo" value={formData.whatsappNo || ""} onChange={handleChange}
                className=" dark:bg-gray-800 dark:text-white" type="text"/>
            }
          />
          <ModalRow
            label1="VAT Reg No."
            value1={
              <input name="vatRegNo" value={formData.vatRegNo || ""} onChange={handleChange}
                className=" dark:bg-gray-800 dark:text-white" type="text"/>
            }
            label2="Country"
            value2={
              <input name="country" value={formData.country || ""} onChange={handleChange}
                className=" dark:bg-gray-800 dark:text-white" type="text"/>
            }
          />
          <ModalRow
            label1="District"
            value1={
              <input name="district" value={formData.district || ""} onChange={handleChange}
                className=" dark:bg-gray-800 dark:text-white" type="text"/>
            }
          />
        </ModalSection>

      
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 flex justify-end gap-2 p-4 border-t border-gray-300 dark:border-gray-700 z-10">
          <button
            className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 font-semibold px-6 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-6 py-2 rounded"
            onClick={handleSubmit}
          >
            Update
          </button>
          
        </div>
      </div>
    </div>
  );
}

