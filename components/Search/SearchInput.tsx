import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import useDebounce from "@/hooks/useDebounce";

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const debouncedValue = useDebounce(value, 200);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  useEffect(() => {
    if (debouncedValue) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: debouncedValue },
      });
    }
  }, [debouncedValue, router]);

  const handleClick = () => {
    setValue("");
    router.push("/link");
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex gap-[8px] w-full h-[54px] items-center px-[16px] py-[15px] bg-gray-100 rounded-[10px] md:h-[54px] sm:h-[43px] transition-all"
    >
      <Image
        src="/icons/search.svg"
        width={16}
        height={16}
        alt="search button"
      />
      <input
        value={value}
        onChange={handleChange}
        placeholder="링크를 검색해 보세요."
        className="flex-grow bg-transparent placeholder:text-gray-500"
      />
      {value && (
        <button
          className="rounded-full bg-white size-6 font-bold text-gray-500 flex items-center justify-center"
          type="button"
          onClick={handleClick}
        >
          ×
        </button>
      )}
    </form>
  );
};

export default SearchInput;
