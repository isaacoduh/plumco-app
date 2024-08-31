import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "./addressCard";
import { useToast } from "../ui/use-toast";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "@/store/shop/address";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  function handleManageAddress(event) {
    event.preventDefault();
    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({ title: "Your can add max 3 addresses", variant: "destructive" });
      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast({ title: "Address updatd successfully" });
          }
        })
      : dispatch(addNewAddress({ ...formData, userId: user?.id })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllAddresses(user?.id));
              setFormData(initialAddressFormData);
              toast({ title: "Address Successfully" });
            }
          }
        );
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({ title: "Address deleted successfully" });
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem._id}
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
        <CardContent className="space-y-3">
          <form onSubmit={handleManageAddress}>
            <div className="flex flex-col gap-3">
              <div className="grid w-full gap-1.5">
                <Label className="mb-1">Address</Label>
                <Input
                  name="address"
                  type="text"
                  placeholder="Enter your address"
                  value={formData["address"]}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      ["address"]: event.target.value,
                    })
                  }
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label className="mb-1">City</Label>
                <Input
                  name="city"
                  type="text"
                  placeholder="Enter your city"
                  value={formData["city"]}
                  onChange={(event) =>
                    setFormData({ ...formData, ["city"]: event.target.value })
                  }
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label className="mb-1">Pincode</Label>
                <Input
                  name="pincode"
                  type="text"
                  placeholder="Enter your Pincode"
                  value={formData["pincode"]}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      ["pincode"]: event.target.value,
                    })
                  }
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label className="mb-1">Phone</Label>
                <Input
                  name="phone"
                  type="text"
                  placeholder="Enter your Phone"
                  value={formData["phone"]}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      ["phone"]: event.target.value,
                    })
                  }
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label className="mb-1">Notes</Label>
                <Textarea
                  name="notes"
                  placeholder="Enter additional notes"
                  value={formData["notes"]}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      ["notes"]: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <Button
              disabled={!isFormValid()}
              type="submit"
              className="mt-2 w-full"
            >
              {currentEditedId !== null ? "Edit" : "Add "}
            </Button>
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default Address;
