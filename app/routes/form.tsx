import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  return json({ message: 'successful', title, slug, markdown });
};


const FormRoute = () => {
  const [show, setShow] = useState(true)
  const actionData = useActionData()

  useEffect(() => {
    if (actionData && actionData.message === 'successful') {
      setShow(false)
    }
  }, [actionData])

  return (
    <>
      <Link to="/" className="block mb-4 text-blue-600 hover:underline">
        Home
      </Link>

      <h3>{JSON.stringify(actionData)}</h3>

      <Form method="post" className={`${show ? "opacity-100" : 'opacity-0'}`}>
        <p>
          <label>
            Post Title:{" "}
            <input
              type="text"
              name="title"
              className={inputClassName}
            />
          </label>
        </p>
        <p>
          <label>
            Post Slug:{" "}
            <input
              type="text"
              name="slug"
              className={inputClassName}
            />
          </label>
        </p>
        <p>
          <label htmlFor="markdown">Markdown:</label>
          <br />
          <textarea
            id="markdown"
            rows={20}
            name="markdown"
            className={`${inputClassName} font-mono`}
          />
        </p>
        <p className="text-right">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
          >
            Create Post
          </button>
        </p>
      </Form>
    </>
  );
}

export default FormRoute  