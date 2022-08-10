import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddNestedRoute = () => {
  const [added, setAdded] = useState([]);
  const [totalAdded, setTotalAdded] = useState([]);
  const { register, getValues, setValue } = useForm();

  const handleAdd = (e) => {
    e.preventDefault();
    const nestedRoute = getValues("nestedRoute");
    const pathRoute = getValues("pathName");
    setAdded({nestedRoute: nestedRoute, pathRoute: pathRoute});
    setValue("nestedRoute", "", "pathName", "");
  };

  useEffect(() => {
    if (added.length !== 0 && totalAdded.indexOf(added) === -1) {
      totalAdded.push(added);
    }

    setTotalAdded(totalAdded);
  }, [totalAdded, added]);

  console.log(added);
  console.log(totalAdded);

  const onSubmit = (e) => {
    e.preventDefault();
    const route = getValues("route");

    const variables = {
      title: route,
      content: totalAdded
    };

    axios.post("http://localhost:5000/routes", variables).then((response) => {
      if (response) {
        toast("Nested Route Created!");
        setValue("route", "");
        setValue("nestedRoute", "");
      }
    });
  };

  return (
    <div>
      <div className="py-10 createRouteSection flex justify-center items-center  navStyle ">
        <div>
          <p className="my-2 text-center text-3xl my-3">
            Create A new Nested Route{" "}
          </p>
          <form action="">
            <label htmlFor="">Route Name</label>
            <input
              type="text"
              placeholder="Enter Route Name"
              class="input input-bordered  w-full my-3"
              {...register("route", {
                required: { value: true },
              })}
            />
            <br />
            <label className="text-center" htmlFor="">
              Nested Route Name
            </label>
            <input
              type="text"
              placeholder="Enter Nested Route Name"
              class="input input-bordered  w-full my-3"
              {...register("nestedRoute", {
                required: { value: true },
              })}
            />{" "}
            <br />
            <label className="text-center" htmlFor="">
              Path Name
            </label>
            <input
              type="text"
              placeholder="Enter Nested path Name"
              class="input input-bordered  w-full my-3"
              {...register("pathName", {
                required: { value: true },
              })}
            />{" "}
            <button className="btn btn-outline button" onClick={handleAdd}>
              Add
            </button>
            <br />
            <button onClick={onSubmit} class="btn button btn-outline mt-2">
              create Route
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNestedRoute;