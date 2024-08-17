import Image from 'next/image'
import React from 'react'

export default function StatCard({count=0, label, icon, type}) {
    return (
        <div 
        className={`flex flex-1 flex-col gap-6 rounded-2xl bg-cover p-6 shadow-lg 
            ${
                type === "appointment" ? "bg-appointments"
                : type === "pending" ? "bg-pending"
                : type === "cancelled" ? "bg-cancelled" : ""
            }`}
        >
            <div className="flex items-center gap-4 text-default-700">
        <Image
          src={icon}
          height={32}
          width={32}
          alt="appointments"
          className="size-8 w-fit"
        />
        <h2 className="text-4xl font-bold ">{count}</h2>
      </div>

      <p className="text-xl font-semibold">{label}</p>
    </div>
    )
}
