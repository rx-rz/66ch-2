import React from "react";
import { Form } from "src/components/Elements/Form/Form";
import { InputField } from "src/components/Elements/Form/InputField";
import { useUploadFile } from "react-firebase-hooks/storage";
export default function PostSettings() {
  return (
    <>
      <Form onSubmit={() => console.log("titties")}>
        {({ register, formState }) => (
          <>
            <input type="file" />
            <InputField
              registration={register("tag")}
              label="tag"
              type="text"
            //   error={formState.errors.}
            />
            <InputField
              registration={register("description")}
              label="description"
              type="text"
            />
          </>
        )}
      </Form>
    </>
  );
}
