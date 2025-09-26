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
  | { type: "text" | "email"; name: string; label: string; placeholder?: string; fullWidth?: boolean }
  | { type: "textarea"; name: string; label: string; placeholder?: string; rows?: number; fullWidth?: boolean }
  | { type: "select"; name: string; label: string; placeholder?: string; options: { label: string; value: string }[]; fullWidth?: boolean };

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
  showFrame = true,
  showSubmitButton = true,
}: {
  fields: FieldConfig[];
  onSubmit: (values: Record<string, string>) => Promise<void> | void;
  showFrame?: boolean;
  showSubmitButton?: boolean;
}) {
  const schema = buildZodSchema(fields);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: Object.fromEntries(fields.map((f) => [f.name, ""])) as any,
    mode: "onTouched",
  });

  const formContent = (
    <div className={showFrame ? "gradient-primary p-6 text-white" : "text-white"}>
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
                    <FormItem className={`${f.fullWidth || f.type === "textarea" ? "md:col-span-2" : ""} flex flex-col gap-2`}>
                      <FormLabel className="font-romanica font-normal text-[18px] leading-[100%] tracking-[0%] uppercase text-white">{f.label}</FormLabel>
                      <FormControl>
                        {f.type === "text" || f.type === "email" ? (
                          <Input
                            type={f.type === "email" ? "email" : "text"}
                            placeholder={f.placeholder}
                            {...field}
                            value={field.value as string}
                            className="w-full h-[64px] px-5 py-5 !font-creato-display !font-medium !text-[18px] !leading-[100%] !tracking-[-5%] bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/10 text-white placeholder:text-white/70 placeholder:font-creato-display placeholder:font-medium placeholder:text-[18px] placeholder:leading-[100%] placeholder:tracking-[-5%] focus:border-white/30 focus:outline-none rounded-none"
                          />
                        ) : f.type === "textarea" ? (
                          <Textarea
                            rows={(f as any).rows ?? 5}
                            placeholder={f.placeholder}
                            {...field}
                            value={field.value as string}
                            className="w-full min-h-[120px] px-5 py-5 !font-creato-display !font-medium !text-[18px] !leading-[100%] !tracking-[-5%] bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/10 text-white placeholder:text-white/70 placeholder:font-creato-display placeholder:font-medium placeholder:text-[18px] placeholder:leading-[100%] placeholder:tracking-[-5%] focus:border-white/30 focus:outline-none resize-none rounded-none"
                          />
                        ) : (
                          <Select onValueChange={field.onChange} value={field.value as string}>
                            <SelectTrigger className="w-full h-[64px] !h-[64px] px-5 py-5 !font-creato-display !font-medium !text-[18px] !leading-[100%] !tracking-[-5%] bg-gradient-to-r from-white/[0.05] to-white/[0.02] !bg-gradient-to-r !from-white/[0.05] !to-white/[0.02] border border-white/10 !border-white/10 text-white focus:border-white/30 !focus:border-white/30 focus:outline-none data-[state=open]:bg-gradient-to-r data-[state=open]:from-white/[0.05] data-[state=open]:to-white/[0.02] data-[state=open]:border-white/30 !data-[state=open]:border-white/30 rounded-none !rounded-none">
                              <SelectValue 
                                placeholder={f.placeholder ?? "Select"} 
                                className="text-white/70 placeholder:text-white/70 !font-creato-display !font-medium !text-[18px] !leading-[100%] !tracking-[-5%]" 
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-black border border-white/10 text-white z-50">
                              <SelectGroup>
                                {(f as any).options?.map((opt: any) => (
                                  <SelectItem 
                                    key={opt.value} 
                                    value={opt.value}
                                    className="text-white/70 hover:bg-white/20 focus:bg-white/20 data-[highlighted]:bg-white/20 data-[state=checked]:bg-white/20 data-[state=checked]:text-white data-[selected]:text-white data-[selected]:bg-white/20 font-creato-display font-medium text-[18px] leading-[100%] tracking-[-5%]"
                                  >
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

          {showSubmitButton && (
            <div className="md:col-span-2 flex justify-center pt-2">
              <Button type="submit" variant="secondary" className="px-8 py-3">Send Message</Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );

  return showFrame ? (
    <Frame variants="white">
      {formContent}
    </Frame>
  ) : (
    formContent
  );
}


