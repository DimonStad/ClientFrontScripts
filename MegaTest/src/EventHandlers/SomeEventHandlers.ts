import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";
import { Layout } from "@docsvision/webclient/System/Layout";
import { layoutManager } from "@docsvision/webclient/System/LayoutManager";
import { func } from "prop-types";

//Some handlers
export async function sampleEventHandler(sender: Layout, e: IEventArgs): JQueryDeferred<void> {
  //some code
}