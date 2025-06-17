import { useState } from "react";

const CustomerRegistration = () => {
  const [formData, setFormData] = useState({
    customerType: "Personal Customer",
    customerName: "",
    identificationType: "NIC",
    nameWithInitials: "",
    identificationNumber: "",
    genderType: "Male",
    generalContactNumber: "",
    date: "",
    whatsAppNumber: "",
    vATRegistrationNumber: "",
    country: "",
    district: "",

    // Temporary inputs for correspondence
    contactPerson: "",
    designation: "",
    customerNumber: "",
    email: "",
    address1: "",
    address2: "",
    address3: "",
    address4: "",
  });

  const [contacts, setContacts] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field on change
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};

    // Required fields validation
    if (!formData.customerName.trim()) {
      errors.customerName = "Customer name is required";
    }
    if (!formData.identificationNumber.trim()) {
      errors.identificationNumber = "Identification number is required";
    }
    if (!formData.generalContactNumber.trim()) {
      errors.generalContactNumber = "General contact number is required";
    }

    // Email validation (if entered)
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Invalid email format";
      }
    }

    // Contact numbers length example validation
    if (
      formData.generalContactNumber &&
      formData.generalContactNumber.length < 10
    ) {
      errors.generalContactNumber = "Contact number must be at least 10 digits";
    }
    if (formData.whatsAppNumber && formData.whatsAppNumber.length < 10) {
      errors.whatsAppNumber = "WhatsApp number must be at least 10 digits";
    }

    // Check if at least one contact is added
    if (contacts.length === 0) {
      errors.contacts = "At least one contact must be added.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const finalData = {
      ...formData,
      contacts,
    };

    try {
      const response = await fetch(
        "https://your-backend-api.com/api/customers",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        },
      );
      if (!response.ok) throw new Error("Something went wrong.");
      const result = await response.json();
      alert("Customer registered successfully!");
      console.log(result);
    } catch (err) {
      alert("Error registering customer.");
      console.error(err);
    }
  };

  const handleAddContact = () => {
    const newContact = {
      contactPerson: formData.contactPerson,
      designation: formData.designation,
      customerNumber: formData.customerNumber,
      email: formData.email,
      address1: formData.address1,
      address2: formData.address2,
      address3: formData.address3,
      address4: formData.address4,
    };

    // Optional: prevent adding empty contactPerson
    if (!newContact.contactPerson.trim()) {
      alert("Please enter at least the contact person's name.");
      return;
    }

    setContacts([...contacts, newContact]);

    setFormData((prev) => ({
      ...prev,
      contactPerson: "",
      designation: "",
      customerNumber: "",
      email: "",
      address1: "",
      address2: "",
      address3: "",
      address4: "",
    }));
  };

  const handleCancel = () => {
    setFormData({
      customerType: "Personal Customer",
      customerName: "",
      identificationType: "NIC",
      nameWithInitials: "",
      identificationNumber: "",
      genderType: "Male",
      contactPerson: "",
      designation: "",
      customerNumber: "",
      email: "",
      address1: "",
      address2: "",
      address3: "",
      address4: "",
      generalContactNumber: "",
      date: "",
      whatsAppNumber: "",
      vATRegistrationNumber: "",
      country: "",
      district: "",
    });
    setContacts([]);
    setErrors({});
  };
  return (
    <div className="max-w-40xl container mx-auto p-6">
      <div className="rounded-[10px] border border-gray-300 bg-white p-6 shadow-sm shadow-gray-300">
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-blue-600 bg-blue-600 text-3xl">
            <img
              src="/images/Profile-Icon.png"
              alt="Profile"
              className="h-15 w-full rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-dark-900 my-3 text-[30px] font-bold">
              Customer Registration
            </h1>
            <p className="mx-0.5 -my-1 text-[14px] text-gray-600">
              Manage your customer database efficiently
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-dark-900 mb-6 flex w-full items-center gap-x-2 border-b border-gray-300 bg-blue-100 p-4 text-[25px] font-semibold shadow-sm sm:p-4 md:p-6">
              Basic Details{" "}
              <span className="rounded-[20px] border border-red-500 bg-red-100 px-1.5 py-0.5 text-[10px] text-red-500">
                Required
              </span>
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div>
                <label className="text-dark-500 mb-1 block font-medium">
                  Customer Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="customerType"
                  value={formData.customerType}
                  onChange={handleChange}
                  required
                  className="text-dark-300 w-full rounded border px-3 py-2"
                >
                  <option value="Personal Customer">Personal Customer</option>
                  <option value="Corporate Customer">Corporate Customer</option>
                </select>
              </div>
              <div>
                <label className="text-dark-500 mb-1 block font-medium">
                  Enter Customer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Enter Customer Name"
                  className="text-dark-500 w-full rounded border px-3 py-2"
                />
                {errors.customerName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.customerName}
                  </p>
                )}
              </div>
              <div>
                <label className="text-dark-500 mb-1 block font-medium">
                  Identification Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="identificationType"
                  value={formData.identificationType}
                  onChange={handleChange}
                  required
                  className="text-dark-300 w-full rounded border px-3 py-2"
                >
                  <option value="NIC">NIC</option>
                  <option value="Pass-Port">Pass Port</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-dark-500 mb-1 block font-medium">
                Enter Name with Initials <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nameWithInitials"
                value={formData.nameWithInitials}
                onChange={handleChange}
                required
                placeholder="Enter name with initials"
                className="text-dark-500 w-full rounded border px-3 py-2"
              />
            </div>

            <div className="mt-4">
              <label className="text-dark-500 mb-1 block font-medium">
                Identification Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="identificationNumber"
                value={formData.identificationNumber}
                onChange={handleChange}
                placeholder="e.g 123456789V or 123456789012"
                className="text-dark-500 w-full rounded border px-3 py-2"
              />
              <small className="text-gray-500">
                Format: 9 digits V/X or 12 digits
              </small>
              {errors.identificationNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.identificationNumber}
                </p>
              )}
            </div>
          </div>

          {/*Correspondence Details*/}
          <h2 className="text-dark-900 mb-6 flex w-full items-center gap-x-2 border-b border-gray-300 bg-blue-100 p-4 text-[25px] font-semibold shadow-sm sm:p-4 md:p-6">
            Correspondence Details
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              placeholder="Contact Person Name"
              className="text-dark-500 w-full rounded border px-3 py-2"
            />
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Designation"
              className="text-dark-500 w-full rounded border px-3 py-2"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
            <input
              type="text"
              name="customerNumber"
              value={formData.customerNumber}
              onChange={handleChange}
              placeholder="Customer Number"
              className="text-dark-500 w-full rounded border px-3 py-2"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="text-dark-500 w-full rounded border px-3 py-2"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="text-dark-500 mb-1 block font-medium">
              Address
            </label>
            <input
              type="text"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              placeholder="Address Line 1"
              className="text-dark-500 mt-2 w-full rounded border px-3 py-2"
            />
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              placeholder="Address Line 2"
              className="text-dark-500 mt-2 w-full rounded border px-3 py-2"
            />
            <input
              type="text"
              name="address3"
              value={formData.address3}
              onChange={handleChange}
              placeholder="Address Line 3"
              className="text-dark-500 mt-2 w-full rounded border px-3 py-2"
            />
            <input
              type="text"
              name="address4"
              value={formData.address4}
              onChange={handleChange}
              placeholder="Address Line 4"
              className="text-dark-500 mt-2 w-full rounded border px-3 py-2"
            />
          </div>

          <div className="mt-4 flex items-start justify-end gap-4">
            <button
              type="button"
              onClick={handleAddContact}
              className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              Add Contact
            </button>
          </div>

          {/* Contact Table */}
          <div className="mt-6 overflow-hidden rounded-[10px] border border-gray-300">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-100 text-left text-sm font-semibold text-gray-700">
                <tr>
                  <th className="border-b border-blue-300 px-4 py-3">
                    Contact Person Name
                  </th>
                  <th className="border-b border-blue-300 px-4 py-3">
                    Designation
                  </th>
                  <th className="border-b border-blue-300 px-4 py-3">
                    Customer Number
                  </th>
                  <th className="border-b border-blue-300 px-4 py-3">
                    Address
                  </th>
                  <th className="border-b border-blue-300 px-4 py-3">Email</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-800">
                {contacts.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-4 text-center text-gray-500"
                    >
                      No contact data available
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 bg-white"
                    >
                      <td className="px-4 py-2">{contact.contactPerson}</td>
                      <td className="px-4 py-2">{contact.designation}</td>
                      <td className="px-4 py-2">{contact.customerNumber}</td>
                      <td className="px-4 py-2 whitespace-pre-line">{`${contact.address1}, ${contact.address2}, ${contact.address3}, ${contact.address4}`}</td>
                      <td className="px-4 py-2">{contact.email}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {errors.contacts && (
            <p className="mt-2 text-sm text-red-500">{errors.contacts}</p>
          )}

          {/*Other Information*/}
          <h2 className="text-dark-900 mb-6 flex w-full items-center gap-x-2 border-b border-gray-300 bg-blue-100 p-4 text-[25px] font-semibold shadow-sm sm:p-4 md:p-6">
            Other Information{" "}
          </h2>

          {/*First Row*/}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* General Contact Number */}
            <div className="w-full">
              <input
                type="text"
                name="generalContactNumber"
                value={formData.generalContactNumber}
                onChange={handleChange}
                placeholder="General Contact Number"
                className="text-dark-500 w-full rounded border px-3 py-2"
              />
              {errors.generalContactNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.generalContactNumber}
                </p>
              )}
            </div>
            {/* Gender Type */}
            <div>
              <select
                name="genderType"
                value={formData.genderType}
                onChange={handleChange}
                required
                className="text-dark-300 w-full rounded border px-3 py-2"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/*Second Row*/}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Date */}
            <div className="relative w-full">
              <input
                ref={(el) => (window.dateInput = el)} // Reference to trigger input on icon click
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="text-dark-300 w-full rounded border px-3 py-2 pr-10"
              />

              {/* Clickable Calendar Icon */}
              <button
                type="button"
                onClick={() => window.dateInput?.showPicker()} // This opens the native date picker
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>

            {/*WhatsApp Number */}
            <div className="w-full">
              <input
                type="text"
                name="whatsAppNumber"
                value={formData.whatsAppNumber}
                onChange={handleChange}
                placeholder="WhatsApp Number"
                className="text-dark-500 w-full rounded border px-3 py-2"
              />
              {errors.whatsAppNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.whatsAppNumber}
                </p>
              )}
            </div>
          </div>

          {/* Third row */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* VAT Registration Number */}
            <div className="w-full">
              <input
                type="text"
                name="vATRegistrationNumber"
                value={formData.vATRegistrationNumber}
                onChange={handleChange}
                required
                placeholder="VAT Registration Number"
                className="text-dark-500 w-full rounded border px-3 py-2"
              />
            </div>

            {/* Country */}
            <div className="w-full">
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                placeholder="Country"
                className="text-dark-500 w-full rounded border px-3 py-2"
              />
            </div>
          </div>
          {/* District */}
          <div>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              placeholder="District"
              className="text-dark-500 w-full rounded border px-3 py-2"
            />
          </div>

          {/* Cancel Button */}
          <div className="my-10 flex items-start justify-end gap-4">
            <div className="pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded bg-gray-600 px-6 py-1 text-white transition hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
            {/* Save Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="rounded bg-blue-600 px-8 py-1 text-white transition hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerRegistration;
