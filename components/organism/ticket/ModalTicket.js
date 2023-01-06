import React from "react";
import TiketCard from "../../molecules/card/TiketCard";

export default function ModalTicket({ data, index, setData, allData }) {
  const handleAddQtyAdult = () => {
    let items = allData;
    let item = data;
    item.adult = item.adult + 1;
    items[index] = item;
    setData([...items]);
  };
  const handleMinQtyAdult = () => {
    let items = allData;
    let item = data;
    item.adult = item.adult - 1;
    items[index] = item;
    setData([...items]);
  };
  const handleAddQtyChild = () => {
    let items = allData;
    let item = data;
    item.child = item.child + 1;
    items[index] = item;
    setData([...items]);
  };
  const handleMinQtyChild = () => {
    let items = allData;
    let item = data;
    item.child = item.child - 1;
    items[index] = item;
    setData([...items]);
  };
  return (
    <div>
      <TiketCard
        index={data?.id}
        qty={data?.adult}
        name={data?.ticket_name}
        price={data?.adult_price}
        type={data?.adult_label}
        handleAddQty={handleAddQtyAdult}
        handleMinQty={handleMinQtyAdult}
      />
      {data?.child_price !== 0 && (
        <TiketCard
          index={data?.id}
          qty={data?.child}
          name={data?.ticket_name}
          price={data?.child_price}
          type={data?.child_label}
          handleAddQty={handleAddQtyChild}
          handleMinQty={handleMinQtyChild}
        />
      )}
    </div>
  );
}
