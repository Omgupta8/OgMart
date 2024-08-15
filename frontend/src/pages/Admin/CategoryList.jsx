// import React from 'react'
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm.jsx";
import Modal from "../../components/Modal.jsx";
import AdminMenu from "./AdminMenu.jsx";

const CategoryList = () => {
  const { data: categories, refetch } = useFetchCategoriesQuery();
  // console.log(categories);
  useEffect(() => {
    refetch();
  }, [refetch]);
  // console.log(categories.data);

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    try {
      const res = await createCategory({ name }).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        setName("");
        toast.success(`${res.name} is created`);
        refetch();
      }
    } catch (err) {
      console.log(err);
      toast.error("Creating category failed , try again!");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updateName) {
      toast.error("Category name is required");
    }
    try {
      // console.log(selectedCategory._id);
      // console.log(updateName);
      const res = await updateCategory({
        categoryId: selectedCategory._id,
        updateCategory: { name: updateName },
      }).unwrap();
      // console.log(res);

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`${res.name} is updated`);
        setSelectedCategory(null);
        setUpdateName("");
        setModalVisible(false);
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteCategory = async (e) => {
    e.preventDefault();
    try {

      const res = await deleteCategory(selectedCategory._id).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        // console.log(res);

        toast.success(`${res.data.name} is deleted`);
        setSelectedCategory(null);
        setModalVisible(false);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("category detection failed, try again!");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <AdminMenu/>
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
          // handleDelete={handleDeleteCategory}
        />
        <br />
        <hr />
        <div className="flex flex-wrap">
          {categories?.data.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    // here we are setting all the values the category ans all
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdateName(category.name);
                  }
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updateName}
            setValue={(value) => setUpdateName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
