"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Frame from "../common/frame";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

export type FieldConfig =
  | { type: "text" | "email"; name: string; label: string; placeholder?: string }
  | { type: "textarea"; name: string; label: string; placeholder?: string; rows?: number }
  | { type: "select"; name: string; label: string; placeholder?: string; options: { label: string; value: string }[] };

export function buildZodSchema(fields: FieldConfig[]) {
  const shape: Record<string, any> = {};
  for (const f of fields) {
    if (f.type === "email") {
      shape[f.name] = z.string().email({ message: "Enter a valid email" });
    } else if (f.type === "text") {
      shape[f.name] = z.string().min(1, { message: "Required" });
    } else if (f.type === "textarea") {
      shape[f.name] = z.string().min(1, { message: "Required" });
    } else if (f.type === "select") {
      shape[f.name] = z.string().min(1, { message: "Select an option" });
    }
  }
  return z.object(shape);
}

export default function SupportForm({
  fields,
  onSubmit,
}: {
  fields: FieldConfig[];
  onSubmit: (values: Record<string, string>) => Promise<void> | void;
}) {
  const schema = buildZodSchema(fields);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: Object.fromEntries(fields.map((f) => [f.name, ""])) as any,
    mode: "onTouched",
  });

  return (
    <Frame variants="white">
      <div className="gradient-primary p-6 text-white">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (vals) => {
              await onSubmit(vals as any);
            })}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {fields.map((f) => (
              <FormField
                key={f.name}
                control={form.control}
                name={f.name as any}
                render={({ field }) => (
                  <FormItem className={`${f.type === "textarea" ? "md:col-span-2" : ""} flex flex-col gap-2`}>
                    <FormLabel className="font-romanica font-normal text-[18px] leading-[100%] tracking-[0%] uppercase text-white">{f.label}</FormLabel>
                    <FormControl>
                      {f.type === "text" || f.type === "email" ? (
                        <Input 
                          type={f.type === "email" ? "email" : "text"} 
                          placeholder={f.placeholder} 
                          {...field} 
                          value={field.value as string}
                          className="w-full h-[61px] px-5 py-5 font-creato-display font-medium text-[18px] leading-[100%] tracking-[-5%] bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/10 text-white placeholder:text-white/70 focus:border-white/30 focus:outline-none"
                        />
                      ) : f.type === "textarea" ? (
                        <Textarea 
                          rows={(f as any).rows ?? 5} 
                          placeholder={f.placeholder} 
                          {...field} 
                          value={field.value as string}
                          className="w-full min-h-[120px] px-5 py-5 font-creato-display font-medium text-[18px] leading-[100%] tracking-[-5%] bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/10 text-white placeholder:text-white/70 focus:border-white/30 focus:outline-none resize-none"
                        />
                      ) : (
                        <Select onValueChange={field.onChange} value={field.value as string}>
                          <SelectTrigger className="w-full h-[61px] px-5 py-5 font-creato-display font-medium text-[18px] leading-[100%] tracking-[-5%] bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/10 text-white focus:border-white/30 focus:outline-none">
                            <SelectValue placeholder={f.placeholder ?? "Select"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {(f as any).options?.map((opt: any) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <div className="md:col-span-2 flex justify-center pt-2">
              <Button type="submit" variant="secondary" className="px-8 py-3">Send Message</Button>
            </div>
          </form>
        </Form>
      </div>
    </Frame>
  );
}


