import ProductImageUpload from "@/components/admin/imageUpload";
import AdminProductTile from "@/components/admin/productTile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
// import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/productSlice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();
  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
            toast({
              title: "Product edited successfully",
            });
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          console.log(data, "add");
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Product add successfully",
            });
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast({
          title: "Product deleted Successfully",
          variant: "destructive",
        });
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem._id}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          {/* Product Image Upload */}
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          {/* form */}
          <div className="py-6">
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-3">
                <div className="grid w-full gap-1.5" key="title">
                  <Label className="mb-1">Title</Label>
                  <Input
                    name="title"
                    placeholder="Enter product title"
                    id="title"
                    type="text"
                    value={formData["title"]}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        ["title"]: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid w-full gap-1.5" key="description">
                  <Label className="mb-1">Description</Label>
                  <Textarea
                    name="title"
                    placeholder="Enter product title"
                    id="title"
                    value={formData["description"]}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        ["description"]: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid w-full gap-1.5" key="category">
                  <Label className="mb-1">Category</Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({ ...formData, ["category"]: value })
                    }
                    value={formData["category"]}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                      <SelectContent>
                        <SelectItem key="men" value="men">
                          Men
                        </SelectItem>
                        <SelectItem key="women" value="women">
                          Women
                        </SelectItem>
                        <SelectItem key="kids" value="Kids">
                          Kids
                        </SelectItem>
                        <SelectItem key="accessories" value="accessories">
                          Accessories
                        </SelectItem>
                        <SelectItem key="footwear" value="footwear">
                          Footwear
                        </SelectItem>
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </div>
                <div className="grid w-full gap-1.5" key="brand">
                  <Label className="mb-1">Brand</Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({ ...formData, ["brand"]: value })
                    }
                    value={formData["brand"]}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Brand" />
                      <SelectContent>
                        <SelectItem key="nike" value="nike">
                          Nike
                        </SelectItem>
                        <SelectItem key="adidas" value="adidas">
                          Adidas
                        </SelectItem>
                        <SelectItem key="puma" value="puma">
                          Puma
                        </SelectItem>
                        <SelectItem key="levi" value="levi">
                          Levi's
                        </SelectItem>
                        <SelectItem key="zara" value="zara">
                          Zara
                        </SelectItem>
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </div>
                <div className="grid w-full gap-1.5" key="price">
                  <Label className="mb-1">Price</Label>
                  <Input
                    name="price"
                    placeholder="Enter product price"
                    id="price"
                    type="number"
                    value={formData["price"]}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        ["price"]: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid w-full gap-1.5" key="salePrice">
                  <Label className="mb-1">Sale Price</Label>
                  <Input
                    name="salePrice"
                    placeholder="Enter sale price (optional)"
                    id="salePrice"
                    type="number"
                    value={formData["salePrice"]}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        ["salePrice"]: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid w-full gap-1.5" key="totalStock">
                  <Label className="mb-1">Total Stock</Label>
                  <Input
                    name="totalStock"
                    placeholder="Enter total stock"
                    id="totalStock"
                    type="number"
                    value={formData["totalStock"]}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        ["totalStock"]: event.target.value,
                      })
                    }
                  />
                </div>
                <Button
                  disabled={!isFormValid()}
                  type="submit"
                  className="mt-2 w-full"
                >
                  {currentEditedId !== null ? "Edit" : "Add"}
                </Button>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
